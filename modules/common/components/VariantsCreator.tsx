import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type VariantType = { text: string; isCorrect: boolean };

type Props = {
  value?: { variants: string[]; corrects: number[] };
  onChange?: (params: { variants: string[]; correct: number[] }) => void;
  errorVariants?: string | string[] | undefined;
  touchedVariants?: boolean | undefined;
  errorCorrects?: string | string[] | undefined;
  disabled?: boolean;
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
  disabled,
}: Props) => {
  const [text, setText] = useState("");
  const [checkedItems, setCheckedItems] = useState<VariantType[]>(() =>
    value ? parseValues(value) : [],
  );

  const handleCheckboxChange = (text: string) => {
    setCheckedItems((prev) =>
      prev.map((elem) =>
        text === elem.text ? { ...elem, isCorrect: !elem.isCorrect } : elem,
      ),
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
      elem.isCorrect ? resultIsCorrect.push(index) : false,
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
      <View className="mb-4 space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Variant Text
        </Label>
        <Input
          placeholder="Enter variant"
          value={text}
          onChangeText={(text: string) => setText(text)}
          className={errorVariants && touchedVariants ? "border-red-500" : ""}
        />
        {errorVariants && touchedVariants && (
          <Text className="text-xs text-red-500">
            {Array.isArray(errorVariants) && errorVariants[0]}
          </Text>
        )}
      </View>
      <Button
        disabled={disabled}
        style={{ marginVertical: 16 }}
        onPress={handleAddChecked}
        className="text-white"
      >
        <Text className="text-primary-foreground font-semibold">
          Add variant
        </Text>
      </Button>
      <View className="gap-3">
        {checkedItems.map((elem, index) => (
          <View
            key={elem.text}
            className="flex-row items-center justify-between rounded-md border border-input bg-background p-3"
          >
            <View className="flex-1 flex-row items-center gap-3 px-4">
              <Checkbox
                disabled={disabled}
                checked={elem.isCorrect}
                onCheckedChange={() => handleCheckboxChange(elem.text)}
              />
              <Text className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {elem.text}
              </Text>
            </View>
            <Button
              disabled={disabled}
              onPress={() => handleRemoveChecked(elem.text)}
            >
              <Text className="text-primary-foreground font-semibold">
                Remove
              </Text>
            </Button>
          </View>
        ))}
        {errorVariants && touchedVariants && (
          <Text className="text-xs text-red-500">
            {Array.isArray(errorVariants) && errorVariants[0]}
          </Text>
        )}
        {errorCorrects && touchedVariants && (
          <Text className="text-xs text-red-500">
            {Array.isArray(errorCorrects) && errorCorrects[0]}
          </Text>
        )}
      </View>
      <Text className="text-sm" style={{ marginVertical: 12 }}>
        To add a new variant, write in the field and press the &quot;Add
        variant&quot; button. Your question will be created under the button. If
        the question is correct, check it.
      </Text>
    </View>
  );
};

export default VariantsCreator;
