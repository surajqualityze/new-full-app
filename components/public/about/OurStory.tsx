import Image from "next/image";
import Link from "next/link";

// Card interface for type safety
interface StoryCard {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const cards: readonly StoryCard[] = [
  {
    title: "Our Purpose",
    description:
      "To deliver experiences that change the way your customers feel about your business",
    imageUrl:
      "https://res.cloudinary.com/ddk3xqd3h/image/upload/v1733145600/purpose.jpg",
    link: "/about/purpose",
  },
  {
    title: "Our Team",
    description:
      "Holistic leadership, holistic growth! A team of visionaries connected by shared commitments for a unified vision",
    imageUrl:
      "https://res.cloudinary.com/ddk3xqd3h/image/upload/v1733145600/team.jpg",
    link: "/about/team",
  },
  {
    title: "Awards & Recognitions",
    description:
      "Our dedication is fueled by your compliments, inspiring us to push the boundaries of excellence",
    imageUrl:
      "https://res.cloudinary.com/ddk3xqd3h/image/upload/v1733145600/awards.jpg",
    link: "/about/awards",
  },
  {
    title: "Our Brands",
    description:
      "We are one, but we are many! Transform your digital footprint with our trusted brands",
    imageUrl:
      "https://res.cloudinary.com/ddk3xqd3h/image/upload/v1733145600/brands.jpg",
    link: "/about/brands",
  },
] as const;

export default function OurStory() {
  return (
    <section 
      className="relative w-full saas-container mt-8 px-4 space-y-8 py-20 z-20 bg-white"
      aria-labelledby="story-heading"
    >
      <div className="w-full flex flex-col text-center justify-center items-center">
        <h2 
          id="story-heading"
          className="text-4xl md:text-6xl font-normal capitalize leading-tight md:leading-[52px]"
        >
          Our Story
        </h2>
        <p className="mt-8 md:mt-12 text-sm md:text-lg leading-relaxed max-w-3xl text-gray-600">
          From humble origins to global trailblazers – the transformational
          journey of an Indian startup from a small town in Kerala, that moulded
          itself into a global technology game changer and now stands out from
          its peers. Our story is worth a good read!
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-0 md:px-40">
        {cards.map((card: StoryCard, index: number) => (
          <article
            key={`story-card-${index}`}
            className="bg-white overflow-hidden flex flex-col px-8 group"
          >
            {/* Image wrapper with hover zoom */}
            <div className="relative overflow-hidden w-full h-20">
              <Image
                src={card.imageUrl}
                alt={`${card.title} illustration`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                quality={85}
              />
            </div>

            <div className="py-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600 flex-grow">{card.description}</p>
              <Link
                href={card.link}
                className="mt-4 text-blue-600 hover:underline inline-flex items-center transition-colors"
                aria-label={`Learn more about ${card.title}`}
              >
                Learn more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
