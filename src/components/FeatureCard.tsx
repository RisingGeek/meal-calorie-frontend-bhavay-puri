import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="transition-all hover:shadow-md border-2">
      <CardHeader>
        <div className="mb-3 text-green-600 dark:text-green-400">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default FeatureCard;