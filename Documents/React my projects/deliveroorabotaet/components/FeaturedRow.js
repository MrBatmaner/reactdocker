import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import { useEffect } from 'react';
import { useState } from 'react';
import sanityClient from '../sanity';
import createImageUrlBuilder from "@sanity/image-url";


const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
      sanityClient.fetch(
        `
         *[_type == "featured"] && _id == $id] {
            ...,
           restaurants[]->{
            ...,
            dishes[]->,
            type-> {
              name
            }
           },
            }[0]
        `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
    }, [id]);

  


  return (
    <View>
        <View className="mt-3 flex-row items-center justify-between px-4">
            <Text className="font-bold text-lg">{title}</Text>
            <ArrowRightIcon color="#00CCBB" />

        </View>
        <Text className="text-xs text-gray-500 px-4">{description}</Text>

        <ScrollView
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
            showsHorizontalScrollIndicator={false}
            className="pt-4" 
        >

        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            address={restaurant.address}
            title={restaurant.name}
            dishes={restaurant.dishes}
            rating={restaurant.rating}
            short_description={restaurant.short_description}
            genre={restaurant.type?.name}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}

            {/* RestaurantCards... */}

            <RestaurantCard
              id={123}
              imgUrl="https://links.papareact.com/gn7"
              title="YYOOO! Sushi"
              rating={4.5}
              genre="Japanese"
              address="123 Main St"
              short_description="This is a Test description"
              dishes={[]}
              long={20}
              lat={0}                         
            />

            <RestaurantCard
              id={123}
              imgUrl="https://links.papareact.com/gn7"
              title="YYOOO! Sushi"
              rating={4.5}
              genre="Japanese"
              address="123 Main St"
              short_description="This is a Test description"
              dishes={[]}
              long={20}
              lat={0}                         
            />

            <RestaurantCard
              id={123}
              imgUrl="https://links.papareact.com/gn7"
              title="YYOOO! Sushi"
              rating={4.5}
              genre="Japanese"
              address="123 Main St"
              short_description="This is a Test description"
              dishes={[]}
              long={20}
              lat={0}                         
            />

        </ScrollView>
      
    </View>
  );
};

export default FeaturedRow;