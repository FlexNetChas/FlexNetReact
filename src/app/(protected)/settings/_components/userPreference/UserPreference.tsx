import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

type Props = {};

export default function UserPreference({}: Props) {
  const { setTheme } = useTheme();

  return (
    <div className="space-y-5">
      {/* Basic Preferences */}
      <div className="setting-section-layout">
        <div className="p-5">
          <h3>Dark Mode</h3>
          <p className="text-muted-foreground mt-2">
            Switch between light and dark theme
          </p>
        </div>

        <div className="space-y-5 p-5">
          <Select onValueChange={(value) => setTheme(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="System" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system" onClick={() => setTheme("system")}>
                System
              </SelectItem>
              <SelectItem value="light" onClick={() => setTheme("light")}>
                Light
              </SelectItem>
              <SelectItem value="dark" onClick={() => setTheme("dark")}>
                Dark
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
