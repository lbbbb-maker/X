import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Submission } from "@shared/routes";
import { insertSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export function useSubmissions() {
  return useQuery({
    queryKey: [api.submissions.list.path],
    queryFn: async () => {
      const res = await fetch(api.submissions.list.path, { credentials: "include" });
      if (res.status === 401) throw new Error("Unauthorized");
      if (!res.ok) throw new Error("Failed to fetch submissions");
      return api.submissions.list.responses[200].parse(await res.json());
    },
    retry: false,
  });
}

export function useCreateSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: z.infer<typeof insertSubmissionSchema>) => {
      const res = await fetch(api.submissions.create.path, {
        method: api.submissions.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit");
      }
      
      return api.submissions.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.submissions.list.path] });
    },
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: async (password: string) => {
      const res = await fetch(api.admin.login.path, {
        method: api.admin.login.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Invalid password");
      return api.admin.login.responses[200].parse(await res.json());
    },
  });
}