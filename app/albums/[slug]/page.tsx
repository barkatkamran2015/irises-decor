import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "../../components/BookingForm";
import { albums, getAlbum } from "../../lib/albums";

type AlbumPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return albums.map((album) => ({
    slug: album.slug
  }));
}

export async function generateMetadata({ params }: AlbumPageProps) {
  const { slug } = await params;
  const album = getAlbum(slug);

  if (!album) {
    return {
      title: "Album not found | Irises Decor"
    };
  }

  return {
    title: `${album.title} | Irises Decor`,
    description: album.description
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug } = await params;
  const album = getAlbum(slug);

  if (!album) {
    notFound();
  }

  return (
    <main>
      <nav className="topbar topbar-solid" aria-label="Album navigation">
        <Link className="brand" href="/">
          <Image src="/irises-logo.svg" alt="Irises Decor" width={150} height={54} priority />
        </Link>
        <div className="nav-links">
          <Link href="/#albums">Albums</Link>
          <Link href="/#packages">Packages</Link>
          <a href="#album-booking">Book</a>
        </div>
      </nav>

      <section className="album-hero">
        <Image
          src={album.image}
          alt={`${album.title} decor inspiration`}
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="album-hero-content">
          <Link className="back-link" href="/#albums">
            Back to albums
          </Link>
          <p className="eyebrow">{album.type}</p>
          <h1>{album.title}</h1>
          <p>{album.description}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#album-booking">
              Select this look
            </a>
            <Link className="secondary-button" href="/#booking">
              Book without album
            </Link>
          </div>
        </div>
      </section>

      <section className="album-detail-intro">
        <div>
          <p className="eyebrow">Style direction</p>
          <h2>{album.mood}</h2>
        </div>
        <div className="detail-facts">
          <span>
            <strong>{album.guestRange}</strong>
            Guest range
          </span>
          <span>
            <strong>{album.packageName}</strong>
            Package match
          </span>
          <span>
            <strong>{album.priceNote}</strong>
            Best fit
          </span>
        </div>
      </section>

      <section className="album-gallery-section">
        <div className="album-gallery">
          {[album.image, ...album.gallery].map((image, index) => (
            <div className={index === 0 ? "gallery-feature" : "gallery-tile"} key={image}>
              <Image
                src={image}
                alt={`${album.title} sample ${index + 1}`}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 900px) 100vw, 50vw"
                    : "(max-width: 900px) 50vw, 25vw"
                }
              />
            </div>
          ))}
        </div>
      </section>

      <section className="album-planning-section">
        <div className="palette-panel">
          <p className="eyebrow">Color palette</p>
          <div className="palette-list">
            {album.palette.map((color) => (
              <span key={color}>{color}</span>
            ))}
          </div>
        </div>
        <div className="includes-panel">
          <p className="eyebrow">Included decor ideas</p>
          <ul>
            {album.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="booking-section album-booking-section" id="album-booking">
        <div className="booking-copy">
          <p className="eyebrow">Selected album</p>
          <h2>Book {album.title} for your party.</h2>
          <p>
            The form is already matched to this decor style. Choose the date,
            send the party details, and reserve it with the online deposit.
          </p>
        </div>
        <BookingForm selectedLook={album.title} selectedPackage={album.packageName} />
      </section>
    </main>
  );
}
