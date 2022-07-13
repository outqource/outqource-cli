import axios from "axios";

export const fetchTemplateInfo = async (): Promise<Record<
  string,
  string[]
> | null> => {
  try {
    const { data } = await axios.get(
      "https://raw.githubusercontent.com/outqource/outqource-template/dev/cli.json"
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const printTemplateInfo = async () => {
  const templateInfo = await fetchTemplateInfo();
  if (!templateInfo) return null;

  console.red("Stack & Template Info");
  Object.entries(templateInfo).forEach(
    ([stack, templates]: [string, string[]], index: number) => {
      console.log(`  ${index + 1}: ${stack}`);
      templates.forEach((template) => {
        console.log(`    - ${template}`);
      });
    }
  );

  return true;
};
