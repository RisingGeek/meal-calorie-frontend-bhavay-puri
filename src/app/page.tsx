import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, TrendingUp, Search, Shield, Zap, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FeatureCard from '@/components/FeatureCard';

const HomePage = () => {

  // useEffect(() => {
  //   // Redirect to dashboard if already logged in
  //   if (token) {
  //     router.push('/dashboard');
  //   }
  // }, [token, router]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.05]" />
        <div className="container relative mx-auto px-4 py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-7xl">
              Track Your Calories
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                The Smart Way
              </span>
            </h1>
            <p className="mb-8 text-xl text-slate-600 dark:text-slate-400 lg:text-2xl">
              Get instant nutritional information for thousands of dishes. Make informed decisions about your meals.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>

          {/* Feature Preview Cards */}
          <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-3">
            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950">
                  <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Instant Search</CardTitle>
                <CardDescription>
                  Search thousands of dishes and get calorie information in seconds
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Monitor your daily intake and view detailed statistics over time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Meal History</CardTitle>
                <CardDescription>
                  Access your complete meal history and repeat searches instantly
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
              Everything You Need
            </h2>
            <p className="mb-12 text-lg text-slate-600 dark:text-slate-400">
              Simple, powerful tools to help you make better food choices
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Accurate Data"
              description="Powered by USDA FoodData Central for reliable nutritional information"
            />
            <FeatureCard
              icon={<Utensils className="h-8 w-8" />}
              title="Thousands of Foods"
              description="Access a comprehensive database of dishes and ingredients"
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Smart Analytics"
              description="View trends and insights about your eating habits"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Quick Logging"
              description="Log meals in seconds with our intuitive interface"
            />
            <FeatureCard
              icon={<Search className="h-8 w-8" />}
              title="Smart Search"
              description="Find exactly what you're looking for with intelligent search"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Lightning Fast"
              description="Get results instantly without any delays"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;