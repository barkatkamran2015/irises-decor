import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";
import { NextResponse } from "next/server";

type Booking = {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  packageName: string;
  selectedLook: string;
  guestCount: number;
  location: string;
  notes: string;
  amount: number;
  createdAt: string;
  paymentStatus: "paid";
};

const bundledFilePath = path.join(process.cwd(), "data", "bookings.json");
const writableFilePath =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "irises-bookings.json")
    : bundledFilePath;
const blobPath = "bookings/bookings.json";

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readBookingStore(): Promise<{
  bookings: Booking[];
  etag?: string;
}> {
  if (hasBlobStorage()) {
    const bookingBlob = await get(blobPath, {
      access: "private",
      useCache: false
    });

    if (!bookingBlob) {
      await put(blobPath, "[]", {
        access: "private",
        contentType: "application/json",
        allowOverwrite: true
      });
      return { bookings: [] };
    }

    const raw = await new Response(bookingBlob.stream).text();
    return {
      bookings: JSON.parse(raw) as Booking[],
      etag: bookingBlob.blob.etag
    };
  }

  try {
    const raw = await fs.readFile(writableFilePath, "utf8");
    return { bookings: JSON.parse(raw) as Booking[] };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      let initialBookings = "[]";

      try {
        initialBookings = await fs.readFile(bundledFilePath, "utf8");
      } catch {
        initialBookings = "[]";
      }

      await fs.mkdir(path.dirname(writableFilePath), { recursive: true });
      await fs.writeFile(writableFilePath, initialBookings);
      return { bookings: JSON.parse(initialBookings) as Booking[] };
    }

    throw error;
  }
}

async function readBookings(): Promise<Booking[]> {
  const store = await readBookingStore();
  return store.bookings;
}

async function writeBookings(bookings: Booking[], etag?: string) {
  if (hasBlobStorage()) {
    await put(blobPath, JSON.stringify(bookings, null, 2), {
      access: "private",
      contentType: "application/json",
      allowOverwrite: true,
      ...(etag ? { ifMatch: etag } : {})
    });
    return;
  }

  await fs.mkdir(path.dirname(writableFilePath), { recursive: true });
  await fs.writeFile(writableFilePath, JSON.stringify(bookings, null, 2));
}

function isValidFutureDate(value: string) {
  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return /^\d{4}-\d{2}-\d{2}$/.test(value) && selected >= today;
}

export async function GET() {
  const bookings = await readBookings();

  return NextResponse.json({
    reservedDates: bookings.map((booking) => booking.date),
    bookings: bookings.map(({ id, date, eventType, packageName }) => ({
      id,
      date,
      eventType,
      packageName
    }))
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const requiredFields = [
    "date",
    "name",
    "email",
    "phone",
    "eventType",
    "packageName",
    "guestCount",
    "location",
    "cardNumber",
    "cardExpiry",
    "cardCvc"
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json(
        { message: `Missing ${field}.` },
        { status: 400 }
      );
    }
  }

  if (!isValidFutureDate(body.date)) {
    return NextResponse.json(
      { message: "Choose an available future date." },
      { status: 400 }
    );
  }

  const { bookings, etag } = await readBookingStore();
  const alreadyReserved = bookings.some((booking) => booking.date === body.date);

  if (alreadyReserved) {
    return NextResponse.json(
      { message: "That date has already been reserved." },
      { status: 409 }
    );
  }

  const amountByPackage: Record<string, number> = {
    "Sweet Celebration": 650,
    "Wedding Bloom": 1850,
    "Signature Gala": 3200
  };

  const amount = amountByPackage[body.packageName] ?? 650;
  const booking: Booking = {
    id: crypto.randomUUID(),
    date: body.date,
    name: String(body.name),
    email: String(body.email),
    phone: String(body.phone),
    eventType: String(body.eventType),
    packageName: String(body.packageName),
    selectedLook: String(body.selectedLook ?? ""),
    guestCount: Number(body.guestCount),
    location: String(body.location),
    notes: String(body.notes ?? ""),
    amount,
    createdAt: new Date().toISOString(),
    paymentStatus: "paid"
  };

  try {
    await writeBookings([...bookings, booking], etag);
  } catch (error) {
    if ((error as Error).name === "BlobPreconditionFailedError") {
      return NextResponse.json(
        { message: "That date was just reserved. Choose another date." },
        { status: 409 }
      );
    }

    throw error;
  }

  return NextResponse.json(
    {
      message: "Your date is reserved and payment is confirmed.",
      booking: {
        id: booking.id,
        date: booking.date,
        amount: booking.amount,
        paymentStatus: booking.paymentStatus
      }
    },
    { status: 201 }
  );
}
