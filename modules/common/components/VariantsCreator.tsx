import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button, Checkbox, TextInput, useTheme } from "react-native-paper";

type VariantType = { text: string; isCorrect: boolean };

type Props = {
  value?: { variants: string[]; corrects: number[] };
  onChange?: (params: { variants: string[]; correct: number[] }) => void;
  errorVariants?: string | string[] | undefined;
  touchedVariants?: boolean | undefined;
  errorCorrects?: string | string[] | undefined;
};

const parseValues = (value: { variants: string[]; corrects: number[] }) => {
  if (value)
    return value.variants.map((elem, id) => {
      return { text: elem, isCorrect: value.corrects.includes(id) };
    });
  return [];
};

const VariantsCreator = ({
  value,
  onChange,
  errorVariants,
  touchedVariants,
  errorCorrects,
}: Props) => {
  const [text, setText] = useState("");
  const [checkedItems, setCheckedItems] = useState<VariantType[]>(() =>
    value ? parseValues(value) : []
  );
  const { colors } = useTheme();

  const handleCheckboxChange = (text: string) => {
    setCheckedItems((prev) =>
      prev.map((elem) =>
        text === elem.text ? { ...elem, isCorrect: !elem.isCorrect } : elem
      )
    );
  };

  const handleAddChecked = () => {
    if (text.trim() === "") return;

    setCheckedItems((prev) => [
      ...prev,
      {
        text,
        isCorrect: false,
      },
    ]);
    setText("");
  };

  const handleParseVariants = useCallback(() => {
    const resultVariants = checkedItems.map((elem) => elem.text);
    const resultIsCorrect: number[] = [];

    checkedItems.filter((elem, index) =>
      elem.isCorrect ? resultIsCorrect.push(index) : false
    );

    return { variants: resultVariants, correct: resultIsCorrect };
  }, [checkedItems]);

  const handleRemoveChecked = (text: string) => {
    setCheckedItems((prev) => prev.filter((elem) => elem.text !== text));
  };

  useEffect(() => {
    onChange?.(handleParseVariants());
  }, [checkedItems, handleParseVariants]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View>
      <TextInput
        label="Variant Text"
        value={text}
        onChangeText={(text) => setText(text)}
        error={!!(errorVariants && touchedVariants)}
      />
      <Button
        mode="outlined"
        style={{ marginVertical: 16 }}
        onPress={handleAddChecked}
      >
        Add variant
      </Button>

      <View>
        {checkedItems.map((elem, index) => (
          <View
            key={elem.text}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Checkbox.Item
              labelStyle={{ width: "65%" }}
              label={elem.text}
              status={elem.isCorrect ? "checked" : "unchecked"}
              onPress={() => handleCheckboxChange(elem.text)}
            />
            <Button
              labelStyle={{ color: colors.error }}
              onPress={() => handleRemoveChecked(elem.text)}
            >
              Remove
            </Button>
          </View>
        ))}
        {errorVariants && touchedVariants && (
          <Text style={{ color: colors.error }}>{errorVariants}</Text>
        )}
        {errorCorrects && touchedVariants && (
          <Text style={{ color: colors.error }}>{errorCorrects}</Text>
        )}
      </View>
      <Text style={{ marginVertical: 12, color: colors.secondary }}>
        {`To add a new variant, write in the field and press the "Add variant"
        button. Your question will be created under the button. If the question
        is correct, check it.`}
      </Text>
    </View>
  );
};

export default VariantsCreator;
