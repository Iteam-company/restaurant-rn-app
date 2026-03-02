import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { ICreateQuestionDTO } from "@/lib/redux/types";
import VariantsCreator from "@/pages/Question/components/VariantsCreator";
import { MoreVertical } from "lucide-react-native";
import { useCallback, useState } from "react";
import { View } from "react-native";

interface Props {
  question: ICreateQuestionDTO;
  onChange?: (params: ICreateQuestionDTO) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

const QuestionElement = ({ question, onChange, onDelete, disabled }: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleTextChange = useCallback(
    (text: string) => {
      onChange && onChange({ ...question, text });
    },
    [onChange, question],
  );

  const handleOnChange = useCallback(
    (values: { variants: string[]; correct: number[] }) => {
      onChange && onChange({ ...question, ...values });
    },
    [onChange, question],
  );

  return (
    <Card className="w-full mb-4">
      <CardContent className="p-4 gap-4">
        <View className="flex-row items-start gap-2">
          <View className="flex-1 gap-1.5">
            <Label className="text-muted-foreground">Question Text</Label>
            <Input
              value={question.text}
              onChangeText={handleTextChange}
              multiline
              className="min-h-[50px] py-2 bg-background"
              editable={!disabled}
            />
          </View>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={disabled}
                className="mt-6"
              >
                <MoreVertical size={20} className="text-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                disabled={disabled}
                onPress={() => setIsDeleteDialogOpen(true)}
                className="flex-row gap-2"
              >
                <Text className="text-destructive font-medium">Delete</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>

        {isDeleteDialogOpen && (
          <ConfirmationDialog
            open={true}
            onOpenChange={setIsDeleteDialogOpen}
            title="Delete Question?"
            text={`Are you sure you want to delete "${question.text}"? This action cannot be undone.`}
            action={() => {
              onDelete && onDelete();
              setIsDeleteDialogOpen(false);
            }}
          >
            <View />
          </ConfirmationDialog>
        )}
        <VariantsCreator
          disabled={disabled}
          value={{ variants: question.variants, corrects: question.correct }}
          onChange={handleOnChange}
        />
        {/* <View>
          {question?.variants.map((elem, index) => (
            <Checkbox.Item
              key={index}
              disabled={true}
              label={elem}
              status={
                question.correct.findIndex((elem) => elem === index) !== -1
                  ? "checked"
                  : "unchecked"
              }
            />
          ))}
        </View> */}
      </CardContent>
    </Card>
  );
};

export default QuestionElement;
