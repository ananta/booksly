import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from 'components/ui/card'

export const InfoCard: React.FC<{
  title: string
  description: string
}> = ({ title, description }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
)
