/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Check,
  ChevronRight,
  Loader2,
  Mail,
  UserCheck,
  User,
} from "lucide-react";
import { sendCampaign } from "@/actions/campaigns";
import { getAudience, type AudienceMember } from "@/actions/audience";

// Types
type WizardStep = 1 | 2 | 3;

interface CampaignWizardProps {
  templates: any[]; // Typed loosely to avoid circular deps or complex imports, ideally types/index.ts
  genres: string[];
}

export function CampaignWizard({ templates, genres }: CampaignWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState<WizardStep>(1);
  const [isPending, startTransition] = useTransition();
  const [audienceCount, setAudienceCount] = useState<number | null>(null);
  const [allAudience, setAllAudience] = useState<AudienceMember[]>([]);
  const [singleRecipientMode, setSingleRecipientMode] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  // Form State
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [campaignConfig, setCampaignConfig] = useState<{
    subject: string;
    filters: {
      source?: "newsletter" | "contact_form";
      genre?: string;
    };
    testEmail?: string;
  }>({
    subject: "",
    filters: {},
  });

  // Helpers
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  // Step 2 Logic: Calculate Audience
  const updateAudienceCount = (filters: any) => {
    startTransition(async () => {
      const res = await getAudience(filters);
      if (res.success) {
        setAudienceCount(res.data.length);
        setAllAudience(res.data);
      }
    });
  };

  const handleNext = () => {
    if (step === 1 && !selectedTemplateId) {
      toast.error("Por favor selecciona un template");
      return;
    }
    if (step === 1 && selectedTemplate) {
      // Pre-fill subject if empty
      if (!campaignConfig.subject) {
        setCampaignConfig((prev) => ({
          ...prev,
          subject: selectedTemplate.subject,
        }));
      }
      // Initial audience check
      updateAudienceCount(campaignConfig.filters);
    }
    setStep((prev) => (prev < 3 ? ((prev + 1) as WizardStep) : prev));
  };

  const handleBack = () => {
    setStep((prev) => (prev > 1 ? ((prev - 1) as WizardStep) : prev));
  };

  const handleSend = () => {
    if (!selectedTemplate) return;

    startTransition(async () => {
      const result = await sendCampaign({
        template: {
          title: selectedTemplate.title,
          body: selectedTemplate.body,
          imageUrl: selectedTemplate.imageUrl,
          ctaText: selectedTemplate.ctaText,
          ctaUrl: selectedTemplate.ctaUrl,
          subject: campaignConfig.subject,
        },
        filters: campaignConfig.filters,
        testEmail:
          singleRecipientMode && selectedEmail
            ? selectedEmail
            : campaignConfig.testEmail || undefined,
      });

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/comunicacion");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Steps Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          <StepIndicator current={step} step={1} label="Template" />
          <div className="w-10 h-px bg-muted" />
          <StepIndicator current={step} step={2} label="Audiencia" />
          <div className="w-10 h-px bg-muted" />
          <StepIndicator current={step} step={3} label="Confirmar" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Selecciona el Contenido"}
            {step === 2 && "Define tu Audiencia"}
            {step === 3 && "Revisar y Enviar"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Elige uno de tus templates diseñados."}
            {step === 2 && "Filtra a qué usuarios enviarás esta campaña."}
            {step === 3 && "Verifica los detalles antes de enviar."}
          </CardDescription>
        </CardHeader>

        <CardContent className="min-h-[300px]">
          {/* STEP 1: CONTENT */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.length === 0 ? (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                  No tienes templates.{" "}
                  <a
                    href="/admin/comunicacion/templates/nuevo"
                    className="underline"
                  >
                    Crea uno primero
                  </a>
                  .
                </div>
              ) : (
                templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplateId(template.id)}
                    className={`cursor-pointer border rounded-lg p-4 transition-all ${
                      selectedTemplateId === template.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "hover:border-primary/50"
                    }`}
                  >
                    <div className="h-24 bg-muted mb-3 rounded flex items-center justify-center overflow-hidden">
                      {template.imageUrl ? (
                        <img
                          src={template.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Mail className="text-muted-foreground" />
                      )}
                    </div>
                    <h4 className="font-semibold">{template.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {template.subject}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* STEP 2: AUDIENCE */}
          {step === 2 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="space-y-2">
                <Label>Asunto del Correo (Editable)</Label>
                <Input
                  value={campaignConfig.subject}
                  onChange={(e) =>
                    setCampaignConfig({
                      ...campaignConfig,
                      subject: e.target.value,
                    })
                  }
                />
              </div>

              <Separator />

              {/* Single Recipient Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="single-mode" className="cursor-pointer">
                      Enviar a un solo destinatario
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Selecciona un email específico de la lista
                    </p>
                  </div>
                </div>
                <Switch
                  id="single-mode"
                  checked={singleRecipientMode}
                  onCheckedChange={(checked) => {
                    setSingleRecipientMode(checked);
                    if (checked) {
                      // Load all audience for selection
                      updateAudienceCount({});
                    }
                  }}
                />
              </div>

              {singleRecipientMode ? (
                <div className="space-y-2">
                  <Label>Seleccionar Destinatario</Label>
                  <Select
                    value={selectedEmail}
                    onValueChange={setSelectedEmail}
                  >
                    <SelectTrigger className="data-[size=default]:h-12">
                      <SelectValue placeholder="Elige un email..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {allAudience.map((member) => (
                        <SelectItem key={member.id} value={member.email}>
                          <div className="flex flex-col items-start">
                            <span>{member.email}</span>
                            {member.name && (
                              <span className="text-xs text-muted-foreground">
                                {member.name}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedEmail && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Solo se enviará a: <strong>{selectedEmail}</strong>
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <Label>Filtrar Audiencia</Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Origen
                      </Label>
                      <Select
                        value={campaignConfig.filters.source || "all"}
                        onValueChange={(val) => {
                          const newVal =
                            val === "all" ? undefined : (val as any);
                          const newFilters = {
                            ...campaignConfig.filters,
                            source: newVal,
                          };
                          setCampaignConfig({
                            ...campaignConfig,
                            filters: newFilters,
                          });
                          updateAudienceCount(newFilters);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="contact_form">
                            Formulario
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Género Musical
                      </Label>
                      <Select
                        value={campaignConfig.filters.genre || "all"}
                        onValueChange={(val) => {
                          const newVal = val === "all" ? undefined : val;
                          const newFilters = {
                            ...campaignConfig.filters,
                            genre: newVal,
                          };
                          setCampaignConfig({
                            ...campaignConfig,
                            filters: newFilters,
                          });
                          updateAudienceCount(newFilters);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          {genres.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
                    <UserCheck className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Destinatarios Estimados
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Basado en los filtros seleccionados
                      </p>
                    </div>
                    <div className="text-2xl font-bold">
                      {audienceCount === null ? "..." : audienceCount}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 3 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="grid gap-4 border p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    Template
                  </div>
                  <div className="col-span-2 text-sm">
                    {selectedTemplate?.name}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    Asunto
                  </div>
                  <div className="col-span-2 text-sm font-semibold">
                    {campaignConfig.subject}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    Audiencia
                  </div>
                  <div className="col-span-2 text-sm">
                    {singleRecipientMode && selectedEmail ? (
                      <>
                        <span className="font-semibold">1 destinatario</span>
                        <span className="block text-xs text-muted-foreground mt-1">
                          {selectedEmail}
                        </span>
                      </>
                    ) : (
                      <>
                        {audienceCount} destinatarios
                        {(campaignConfig.filters.source ||
                          campaignConfig.filters.genre) && (
                          <span className="block text-xs text-muted-foreground mt-1">
                            Filtros: {campaignConfig.filters.source || "Todos"}{" "}
                            / {campaignConfig.filters.genre || "Todos"}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email de Prueba (Opcional)
                </Label>
                <Input
                  placeholder="ejemplo@test.com"
                  value={campaignConfig.testEmail || ""}
                  onChange={(e) =>
                    setCampaignConfig({
                      ...campaignConfig,
                      testEmail: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Si ingresas un email aquí, LA CAMPAÑA SOLO SE ENVIARÁ A ESTE
                  EMAIL.
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1 || isPending}
          >
            Atrás
          </Button>

          {step < 3 ? (
            <Button onClick={handleNext} disabled={isPending}>
              Siguiente <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSend}
              disabled={
                isPending || (audienceCount === 0 && !campaignConfig.testEmail)
              }
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {campaignConfig.testEmail ? "Enviar Prueba" : "Enviar Campaña"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

function StepIndicator({
  current,
  step,
  label,
}: {
  current: number;
  step: number;
  label: string;
}) {
  const isActive = current >= step;
  const isCurrent = current === step;

  return (
    <div
      className={`flex items-center gap-2 ${isActive ? "text-primary" : "text-muted-foreground"}`}
    >
      <div
        className={`
        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors
        ${isActive ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground"}
      `}
      >
        {isActive && !isCurrent ? <Check className="w-4 h-4" /> : step}
      </div>
      <span
        className={`text-sm font-medium ${isCurrent ? "underline decoration-primary underline-offset-4" : ""}`}
      >
        {label}
      </span>
    </div>
  );
}
