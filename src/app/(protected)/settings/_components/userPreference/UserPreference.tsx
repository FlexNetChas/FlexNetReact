import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

export default function UserPreference({}: Props) {
  return (
    <div className="space-y-8">
      {/* Basic Preferences */}
      <section className="grid grid-cols-1 lg:grid-cols-[30%_30%_30%]">
        <div className="p-5">
          <h3 className="text-lg text-primary-foreground">
            Interface Preferences
          </h3>
          <p className="mt-2 text-sm lg:text-base">
            Basic settings to customize your experience.
          </p>
        </div>
        <div className="p-5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-md">
            <div className="flex-1">
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-6">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px] glass">
              <SelectValue placeholder="System" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
    </div>
  );
}
