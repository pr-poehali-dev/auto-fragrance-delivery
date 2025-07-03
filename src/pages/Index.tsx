import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import RestaurantCard from "@/components/RestaurantCard";
import CartSidebar from "@/components/CartSidebar";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = [
    { id: "all", name: "Все", icon: "Grid3X3" },
    { id: "pizza", name: "Пицца", icon: "Pizza" },
    { id: "burger", name: "Бургеры", icon: "Sandwich" },
    { id: "sushi", name: "Суши", icon: "Fish" },
    { id: "dessert", name: "Десерты", icon: "Cake" },
    { id: "drinks", name: "Напитки", icon: "Coffee" },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Додо Пицца",
      image: "/placeholder.svg",
      rating: 4.8,
      deliveryTime: "25-35 мин",
      deliveryFee: 199,
      minOrder: 599,
      category: "pizza",
      tags: ["Пицца", "Итальянская кухня"],
    },
    {
      id: 2,
      name: "KFC",
      image: "/placeholder.svg",
      rating: 4.6,
      deliveryTime: "30-40 мин",
      deliveryFee: 149,
      minOrder: 399,
      category: "burger",
      tags: ["Бургеры", "Курица"],
    },
    {
      id: 3,
      name: "Yakitoriya",
      image: "/placeholder.svg",
      rating: 4.9,
      deliveryTime: "35-45 мин",
      deliveryFee: 249,
      minOrder: 799,
      category: "sushi",
      tags: ["Суши", "Японская кухня"],
    },
    {
      id: 4,
      name: "Burger King",
      image: "/placeholder.svg",
      rating: 4.5,
      deliveryTime: "20-30 мин",
      deliveryFee: 0,
      minOrder: 499,
      category: "burger",
      tags: ["Бургеры", "Фастфуд"],
    },
    {
      id: 5,
      name: "Starbucks",
      image: "/placeholder.svg",
      rating: 4.7,
      deliveryTime: "15-25 мин",
      deliveryFee: 99,
      minOrder: 299,
      category: "drinks",
      tags: ["Кофе", "Десерты"],
    },
    {
      id: 6,
      name: "Тануки",
      image: "/placeholder.svg",
      rating: 4.8,
      deliveryTime: "40-50 мин",
      deliveryFee: 199,
      minOrder: 899,
      category: "sushi",
      tags: ["Суши", "Роллы"],
    },
  ];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: any) => {
    setCartItems((prev) => [...prev, item]);
  };

  const totalItems = cartItems.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Яндекс Доставка
              </h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Icon name="MapPin" size={16} />
                <span>Москва, Тверская 1</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Доставка еды в Москве
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Более 1000 ресторанов и кафе. Быстро, вкусно, недорого
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="Найти ресторан или блюдо"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <Icon name={category.icon} size={16} />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  1000+
                </div>
                <div className="text-gray-600">Ресторанов</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  25 мин
                </div>
                <div className="text-gray-600">Средняя доставка</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.8</div>
                <div className="text-gray-600">Рейтинг сервиса</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-6">
            {selectedCategory === "all"
              ? "Все рестораны"
              : `Категория: ${categories.find((c) => c.id === selectedCategory)?.name}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <Icon
                name="Search"
                size={48}
                className="mx-auto text-gray-400 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Ничего не найдено
              </h3>
              <p className="text-gray-500">
                Попробуйте изменить параметры поиска
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        setItems={setCartItems}
      />
    </div>
  );
};

export default Index;
