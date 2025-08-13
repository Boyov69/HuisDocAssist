
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema voor validatie
const patientSchema = z.object({
  name: z.string().min(2, { message: "Naam moet minimaal 2 tekens bevatten" }),
  dob: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, { 
    message: "Geboortedatum moet in formaat DD-MM-YYYY zijn" 
  }),
  bsn: z.string().regex(/^\d{8,9}$/, { 
    message: "BSN moet 8 of 9 cijfers bevatten" 
  }),
  address: z.string().min(5, { message: "Vul een geldig adres in" }),
  phone: z.string().min(10, { message: "Vul een geldig telefoonnummer in" }),
  email: z.string().email({ message: "Vul een geldig e-mailadres in" }),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface PatientRegistrationFormProps {
  onSuccess?: (data: PatientFormValues) => void;
}

const PatientRegistrationForm = ({ onSuccess }: PatientRegistrationFormProps) => {
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      dob: "",
      bsn: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  async function onSubmit(data: PatientFormValues) {
    try {
      const response = await fetch("http://localhost:3001/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Er is iets misgegaan bij het registreren van de patiënt.");
      }

      const newPatient = await response.json();

      // Toon succesbericht
      toast.success("Patiënt succesvol geregistreerd", {
        description: `${newPatient.name} is toegevoegd aan het systeem.`,
      });

      // Reset het formulier
      form.reset();

      // Callback indien nodig
      if (onSuccess) {
        onSuccess(newPatient);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volledige naam</FormLabel>
                <FormControl>
                  <Input placeholder="Jan Jansen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geboortedatum</FormLabel>
                <FormControl>
                  <Input placeholder="DD-MM-YYYY" {...field} />
                </FormControl>
                <FormDescription>
                  Bijvoorbeeld: 01-01-1980
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bsn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BSN</FormLabel>
                <FormControl>
                  <Input placeholder="123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adres</FormLabel>
                <FormControl>
                  <Input placeholder="Straatnaam 1, 1234 AB Amsterdam" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefoonnummer</FormLabel>
                <FormControl>
                  <Input placeholder="06-12345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mailadres</FormLabel>
                <FormControl>
                  <Input placeholder="email@voorbeeld.nl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full md:w-auto bg-medical hover:bg-medical-accent">
          <UserPlus className="mr-2 h-4 w-4" />
          Patiënt registreren
        </Button>
      </form>
    </Form>
  );
};

export default PatientRegistrationForm;
