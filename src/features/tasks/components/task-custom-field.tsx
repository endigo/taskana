import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useLocalState from "@/hooks/use-local-state";
import { SK_TASK_CONFIG } from "@/common/constants";
import { Input } from "@/components/ui/input";
import {
  DEFAULT_TASK_FIELD_CONFIG,
  DEFAULT_TASK_FIELDS,
  FieldConfig,
} from "@/common/types/task";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

const RESERVED_FIELD_NAMES = [...DEFAULT_TASK_FIELDS, "page", "limit", "sort"];

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter field name",
    })
    .refine((val) => !RESERVED_FIELD_NAMES.includes(val), {
      message: `Cannot use reserved field name: (${RESERVED_FIELD_NAMES.join(", ")})`,
    }),
  type: z.string({
    required_error: "Please enter field name",
  }),
  required: z.boolean(),
  options: z.string().optional(),
});

export const TaskCustomFieldModal = () => {
  const [config, setConfig] = useLocalState(SK_TASK_CONFIG, {});

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: "",
      type: "string",
      required: false,
      options: "",
    },
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const fieldKey = data.name.toLowerCase().replaceAll(" ", "-");

    setConfig((prev) => ({
      ...prev,
      [fieldKey]: {
        label: data.name,
        type: data.type,
        required: data.required,
        options: data.options,
      },
    }));

    toast.success(`Field ${data.name} created!`);
  }

  async function onDelete(fieldName: string) {
    setConfig((prev) => {
      const newConfig = { ...prev };

      delete newConfig[fieldName as keyof typeof config];

      return newConfig;
    });

    toast.success(`Field ${fieldName} removed!`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" aria-label="Manage Fields">
          <Settings />
          <span className="sr-only">Manage Fields</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Fields</DialogTitle>
          <DialogDescription>You can add custom fields</DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Required</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(DEFAULT_TASK_FIELD_CONFIG).map(
              ([key, fieldConfig]) => (
                <TableRow key={key}>
                  <TableCell>{fieldConfig.label}</TableCell>
                  <TableCell>{fieldConfig.type}</TableCell>
                  <TableCell>{fieldConfig.required ? "Yes" : "No"}</TableCell>
                  <TableCell>N/A</TableCell>
                </TableRow>
              ),
            )}
            {Object.entries(config as Record<string, FieldConfig>).map(
              ([name, fieldConfig]) => (
                <TableRow key={name}>
                  <TableCell>{fieldConfig.label}</TableCell>
                  <TableCell>{fieldConfig.type}</TableCell>
                  <TableCell>{fieldConfig.required ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to delete this field?")
                        ) {
                          onDelete(name);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
        <hr className="my-4" />
        <DialogFooter>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Name</FormLabel>
                    <Input
                      defaultValue={field.value}
                      onChange={field.onChange}
                      placeholder="Field Name"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row space-x-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Field Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="string">String</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("type") === "select" && (
                  <FormField
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field Selection Options</FormLabel>
                        <Input
                          defaultValue={field.value}
                          onChange={field.onChange}
                          placeholder="Options"
                        />

                        <FormDescription>
                          Enter comma-separated options for the field.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <FormLabel> Is Required</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add</Button>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
