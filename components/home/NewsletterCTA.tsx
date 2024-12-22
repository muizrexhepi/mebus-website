import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterCTA() {
  return (
    <section className="bg-white py-20 paddingX">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-6">
          <span className="text-sm font-medium tracking-wider text-gray-500 uppercase">
            Join Our Travel Community
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#1B2644] leading-tight max-w-3xl mx-auto">
            Ready to unlock special offers and travel inspiration?
          </h2>
        </div>

        <form className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="h-12 px-4 bg-primary-bg/5 rounded-lg placeholder:text-gray-500"
            required
          />
          <Button
            type="submit"
            className="h-12 px-8 text-white button-gradient rounded-lg font-medium"
          >
            Get Updates
          </Button>
        </form>
      </div>
    </section>
  );
}
