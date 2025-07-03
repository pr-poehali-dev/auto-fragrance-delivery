import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  category: string;
  tags: string[];
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onAddToCart: (item: any) => void;
}

const RestaurantCard = ({ restaurant, onAddToCart }: RestaurantCardProps) => {
  const handleAddToCart = () => {
    onAddToCart({
      id: restaurant.id,
      name: restaurant.name,
      type: "restaurant",
      price: restaurant.minOrder,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-white text-gray-800 font-semibold">
            <Icon name="Star" size={14} className="mr-1 text-yellow-500" />
            {restaurant.rating}
          </Badge>
        </div>
        {restaurant.deliveryFee === 0 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-green-500 text-white">
              Бесплатная доставка
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900">
            {restaurant.name}
          </h3>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Icon name="Clock" size={14} className="mr-1" />
          <span className="mr-4">{restaurant.deliveryTime}</span>
          <Icon name="Truck" size={14} className="mr-1" />
          <span>
            {restaurant.deliveryFee === 0
              ? "Бесплатно"
              : `${restaurant.deliveryFee} ₽`}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Мин. заказ: {restaurant.minOrder} ₽
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            <Icon name="Plus" size={14} className="mr-1" />В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
