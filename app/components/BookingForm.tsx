"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type BookingResponse = {
  reservedDates: string[];
};

type Status = {
  type: "idle" | "success" | "error" | "loading";
  message: string;
};

const packagePrices: Record<string, number> = {
  "Sweet Celebration": 650,
  "Wedding Bloom": 1850,
  "Signature Gala": 3200
};

const initialStatus: Status = {
  type: "idle",
  message: ""
};

type BookingFormProps = {
  selectedLook?: string;
  selectedPackage?: keyof typeof packagePrices;
};

export function BookingForm({
  selectedLook = "",
  selectedPackage = "Wedding Bloom"
}: BookingFormProps) {
  const [reservedDates, setReservedDates] = useState<string[]>([]);
  const [packageName, setPackageName] = useState<keyof typeof packagePrices>(selectedPackage);
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState<Status>(initialStatus);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const total = packagePrices[packageName];
  const isReserved = reservedDates.includes(selectedDate);

  useEffect(() => {
    fetch("/api/bookings")
      .then((response) => response.json())
      .then((data: BookingResponse) => setReservedDates(data.reservedDates))
      .catch(() =>
        setStatus({
          type: "error",
          message: "Reserved dates could not be loaded. Try again shortly."
        })
      );
  }, []);

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isReserved) {
      setStatus({
        type: "error",
        message: "That date is already reserved. Choose another date."
      });
      return;
    }

    setStatus({
      type: "loading",
      message: "Processing payment and reserving your date..."
    });

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus({
        type: "error",
        message: data.message ?? "Booking could not be completed."
      });
      return;
    }

    setReservedDates((dates) => [...dates, String(payload.date)]);
    setStatus({
      type: "success",
      message: `${data.message} Confirmation: ${data.booking.id.slice(0, 8).toUpperCase()}`
    });
    event.currentTarget.reset();
    setPackageName(selectedPackage);
    setSelectedDate("");
  }

  return (
    <form className="booking-form" onSubmit={submitBooking}>
      {selectedLook ? (
        <div className="selected-look">
          <span>Selected album</span>
          <strong>{selectedLook}</strong>
          <input name="selectedLook" type="hidden" value={selectedLook} />
        </div>
      ) : null}

      <div className="form-row">
        <label>
          Your name
          <input name="name" type="text" placeholder="Full name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
      </div>

      <div className="form-row">
        <label>
          Phone
          <input name="phone" type="tel" placeholder="(555) 000-0000" required />
        </label>
        <label>
          Event type
          <select name="eventType" required>
            <option>Wedding</option>
            <option>Birthday party</option>
            <option>Engagement</option>
            <option>Baby shower</option>
            <option>Anniversary</option>
            <option>Graduation</option>
            <option>Other happy party</option>
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Preferred date
          <input
            name="date"
            type="date"
            min={today}
            onChange={(event) => setSelectedDate(event.target.value)}
            required
          />
          {isReserved ? (
            <span className="field-note error-note">Already reserved</span>
          ) : selectedDate ? (
            <span className="field-note">Available for booking</span>
          ) : null}
        </label>
        <label>
          Guests
          <input name="guestCount" type="number" min="10" max="800" placeholder="120" required />
        </label>
      </div>

      <label>
        Event location
        <input name="location" type="text" placeholder="Venue name and city" required />
      </label>

      <label>
        Decoration package
        <select
          name="packageName"
          value={packageName}
          onChange={(event) =>
            setPackageName(event.target.value as keyof typeof packagePrices)
          }
          required
        >
          <option>Sweet Celebration</option>
          <option>Wedding Bloom</option>
          <option>Signature Gala</option>
        </select>
      </label>

      <label>
        Tell us your colors and ideas
        <textarea
          name="notes"
          rows={4}
          placeholder="Tell us about the theme, colors, entrance, stage, table decor, flowers, and photo area."
        />
      </label>

      <div className="payment-panel">
        <div>
          <p className="eyebrow">Online payment</p>
          <h3>${total.toLocaleString()} deposit</h3>
          <p>Pay now to reserve the date. Final balance is confirmed after consultation.</p>
        </div>
        <div className="payment-fields">
          <input
            name="cardNumber"
            inputMode="numeric"
            placeholder="Card number"
            minLength={12}
            required
          />
          <div className="payment-grid">
            <input name="cardExpiry" placeholder="MM/YY" minLength={4} required />
            <input name="cardCvc" placeholder="CVC" minLength={3} required />
          </div>
        </div>
      </div>

      <button className="primary-button" type="submit" disabled={status.type === "loading"}>
        {status.type === "loading" ? "Booking..." : `Pay $${total.toLocaleString()} and reserve`}
      </button>

      {status.message ? (
        <p className={`form-status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
