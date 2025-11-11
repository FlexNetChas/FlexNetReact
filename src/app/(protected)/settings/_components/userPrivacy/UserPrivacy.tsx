import { Button } from "@/components/ui/button";

type Props = {};

export default function UserPrivacy({}: Props) {
  return (
    <div className="space-y-8">
      {/* Data Management */}
      <section className="grid grid-cols-1 lg:grid-cols-[35%_65%]">
        <div className="p-5">
          <h3 className="text-lg text-primary-foreground">Data Management</h3>
          <p className="mt-2 text-sm lg:text-base">
            Download a copy of your personal data
          </p>
        </div>
        <div className="p-5">
          <Button variant="default" className=" mb-2 font-mono">
            Request Data Export
          </Button>
        </div>
      </section>

      {/* Section Divider */}
      <div className="border-t border-border -mx-4 lg:-mx-5" />

      {/* Cookie Preferences */}
      <section className="grid grid-cols-1 lg:grid-cols-[35%_65%]">
        <div className="p-5">
          <h3 className="text-lg text-primary-foreground">
            Cookie Preferences
          </h3>
          <p className="mt-2 text-sm lg:text-base">
            Manage your cookie settings and privacy preferences.
          </p>
        </div>
        <div className="p-5">
          <Button variant="default" className=" mb-2 font-mono">
            {/* TODO: Link to cookie page */}
            Manage Cookie Settings
          </Button>
        </div>
      </section>
    </div>
  );
}
