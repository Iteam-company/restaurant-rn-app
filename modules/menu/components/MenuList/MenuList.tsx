import { useGetAllMenuQuery } from "../../redux/slices/menu-api";
import { MenuCard } from "./components/MenuCard";
import { Chip, Title, useTheme } from "react-native-paper";
import { ActivityIndicator, ScrollView, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useMemo, useEffect } from "react";
import { CategoriesEnum, SeasonsEnum } from "../../types";
import { categoryIcons, seasonIcons } from "./utils";

export const MenuList = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetAllMenuQuery(id);
  const { colors } = useTheme();

  const [selectedSeasons, setSelectedSeasons] = useState<SeasonsEnum[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    CategoriesEnum[]
  >([]);

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      const matchesSeason =
        selectedSeasons.length === 0 || selectedSeasons.includes(item.season);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.categories);

      return matchesSeason && matchesCategory;
    });
  }, [data, selectedSeasons, selectedCategories]);

  const toggleSeason = (season: SeasonsEnum) => {
    setSelectedSeasons((prev) =>
      prev.includes(season)
        ? prev.filter((s) => s !== season)
        : [...prev, season]
    );
  };

  const toggleCategory = (category: CategoriesEnum) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <View style={styles.tagsContainer}>
            {Object.values(SeasonsEnum).map((season) => (
              <Chip
                key={season}
                icon={seasonIcons[season]}
                mode="outlined"
                selected={selectedSeasons.includes(season)}
                onPress={() => toggleSeason(season)}
                style={
                  selectedSeasons.includes(season)
                    ? undefined
                    : styles.selectedChip
                }
              >
                {season}
              </Chip>
            ))}
            {Object.values(CategoriesEnum).map((category) => (
              <Chip
                key={category}
                icon={categoryIcons[category]}
                mode="outlined"
                selected={selectedCategories.includes(category)}
                onPress={() => toggleCategory(category)}
                style={
                  selectedCategories.includes(category)
                    ? undefined
                    : styles.selectedChip
                }
              >
                {category}
              </Chip>
            ))}
          </View>

          {filteredData?.map((el) => (
            <MenuCard
              key={el.id}
              id={el.id}
              title={el.name}
              category={el.categories}
              season={el.season}
            />
          ))}
        </>
      )}
      {!filteredData?.length && !isLoading && (
        <Title style={styles.notFound}>Not found any menu</Title>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagsContainer: {
    width: "100%",
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectedChip: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  notFound: {
    textAlign: "center",
    marginTop: 20,
  },
});
