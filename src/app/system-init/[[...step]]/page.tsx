import { SystemInitWizard } from "../_components/wizard";

export default function SystemInitPage({
  params,
}: {
  params: Promise<{ step?: string[] }>;
}) {
  return <SystemInitWizard params={params} />;
}
