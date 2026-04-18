import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "./components/BookingForm";
import { albums } from "./lib/albums";

const packages = [
  {
    name: "Sweet Celebration",
    price: "$650",
    text: "Birthdays, showers, intimate dinners, and home parties.",
    items: ["Styled backdrop", "Cake or dessert table", "Balloon or floral detail"]
  },
  {
    name: "Wedding Bloom",
    price: "$1,850",
    text: "Ceremony and reception styling for a polished wedding day.",
    items: ["Ceremony focal point", "Reception table styling", "Fresh floral accents"]
  },
  {
    name: "Signature Gala",
    price: "$3,200",
    text: "Full-service decor for weddings, cultural events, and large parties.",
    items: ["Room concept", "Entrance and stage decor", "Tables, florals, candles"]
  }
];

export default function Home() {
  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#home">
          <Image src="/irises-logo.svg" alt="Irises Decor" width={132} height={132} priority />
        </a>
        <div className="nav-links">
          <a href="#albums">Albums</a>
          <a href="#packages">Packages</a>
          <a href="#booking">Book</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <Image
          src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1800&q=90"
          alt="Elegant floral wedding table decoration"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Weddings, birthdays, showers, proposals</p>
          <h1>Decor for every happy party.</h1>
          <p>
            Floral designs, backdrops, tables, balloons, and full event styling
            customers can choose from and reserve online.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#booking">
              Reserve your date
            </a>
            <a className="secondary-button" href="#albums">
              View albums
            </a>
          </div>
          <div className="hero-stats" aria-label="Irises Decor highlights">
            <span>
              <strong>6</strong>
              Albums
            </span>
            <span>
              <strong>3</strong>
              Packages
            </span>
            <span>
              <strong>24/7</strong>
              Online booking
            </span>
          </div>
        </div>
      </section>

      <section className="intro-section">
        <div>
          <p className="eyebrow">Irises Decor</p>
          <h2>Bold first impressions with soft floral detail.</h2>
        </div>
        <p>
          Share your date, guest count, colors, and venue. We prepare the visual
          direction, handle setup, and reserve your celebration date after the
          online deposit.
        </p>
      </section>

      <section className="section" id="albums">
        <div className="section-heading">
          <p className="eyebrow">Sample albums</p>
          <h2>Open an album and choose your party look.</h2>
          <p>
            Each album includes a palette, guest range, package match, and a
            ready-to-book selection form.
          </p>
        </div>
        <div className="album-grid">
          {albums.map((album) => (
            <Link className="album-card" href={`/albums/${album.slug}`} key={album.title}>
              <div className="album-image">
                <Image
                  src={album.image}
                  alt={`${album.title} decoration sample`}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="album-copy">
                <span>{album.type}</span>
                <h3>{album.title}</h3>
                <p>{album.details}</p>
                <div className="album-meta">
                  <small>{album.guestRange}</small>
                  <small>{album.packageName}</small>
                </div>
                <strong className="album-link">Open album</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="feature-band">
        <div>
          <p className="eyebrow">Full event styling</p>
          <h2>Designed to look good in person and in every photo.</h2>
        </div>
        <div className="feature-list">
          <p>Floral arches and stages</p>
          <p>Birthday backdrops</p>
          <p>Wedding reception tables</p>
          <p>Balloon and flower walls</p>
          <p>Candles, linens, and centerpieces</p>
          <p>Setup and pickup</p>
        </div>
      </section>

      <section className="section" id="packages">
        <div className="section-heading">
          <p className="eyebrow">Packages</p>
          <h2>Start with the right celebration size.</h2>
        </div>
        <div className="package-grid">
          {packages.map((item) => (
            <article className="package-card" key={item.name}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </div>
              <strong>{item.price}</strong>
              <ul>
                {item.items.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div>
          <p className="eyebrow">How booking works</p>
          <h2>Select an album, choose a date, and the date is held for you.</h2>
        </div>
        <ol>
          <li>Open an album and select the style for your celebration.</li>
          <li>Pay the deposit online to reserve the date.</li>
          <li>Meet for the design appointment and finalize the look.</li>
        </ol>
      </section>

      <section className="booking-section" id="booking">
        <div className="booking-copy">
          <p className="eyebrow">Book an appointment</p>
          <h2>Reserve your party date.</h2>
          <p>
            The calendar blocks booked dates immediately after payment. Use the
            notes box for colors, theme, venue rules, and inspiration.
          </p>
        </div>
        <BookingForm />
      </section>

      <footer>
        <div>
          <Image src="/irises-logo.svg" alt="Irises Decor" width={138} height={138} />
          <p>Party decor, wedding styling, floral design, and happy gatherings.</p>
        </div>
        <a href="#booking">Book your celebration</a>
      </footer>
    </main>
  );
}
