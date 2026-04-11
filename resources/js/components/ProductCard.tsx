import { Link } from "@inertiajs/react";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  category?: string;
}

const ProductCard = ({ id, image, name, price, category }: ProductCardProps) => {
  return (
    <Link href={route('products.show', id)} className="group cursor-pointer">
      <div className="aspect-[4/5] overflow-hidden bg-cream">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={800}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-4 text-center">
        {category && (
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">
            {category}
          </p>
        )}
        <h3 className="font-serif text-base tracking-wide text-foreground">
          {name}
        </h3>
        <p className="font-sans text-xs tracking-[0.1em] text-muted-foreground mt-1">
          {price} JOD
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
