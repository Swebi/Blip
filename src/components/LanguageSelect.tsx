import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { codeState } from "@/lib/schema";
import { supportedLanguages } from "@/config/languages";

const LanguageSelect = ({
  state,
  updateState,
}: {
  state: codeState;
  updateState: (key: string, value: string) => void;
}) => {
  return (
    <Select
      disabled={state.selectedTab === false || state.viewer === true}
      onValueChange={(value) => updateState("selectedLanguage", value)}
    >
      <SelectTrigger className="w-[100px] lg:w-[180px] dark bg-primary">
        <SelectValue placeholder={state.selectedLanguage} />
      </SelectTrigger>
      <SelectContent className="dark bg-background">
        {supportedLanguages.map((language) => (
          <SelectItem
            value={language.name}
            key={language.id}
            className="dark bg-background"
          >
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
