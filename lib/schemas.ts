import { z } from "zod";

export const CompetencySchema = z.object({
  category: z.string(), // e.g. "Languages & Concurrency", "System Design & Architecture", "Cloud & Infra", "Data & Storage"
  skill_name: z.string(),
  importance: z.enum(["CRITICAL", "PREFERRED", "NICE_TO_HAVE"]),
  status: z.enum(["MATCHED", "ADJACENT", "CRITICAL_GAP"]),
  jd_requirement_context: z.string(),
  candidate_evidence: z.string().optional().default(""),
  gap_reasoning: z.string().optional().default(""),
  actionable_fix: z.string().optional().default("")
});

export const ProofOfWorkSchema = z.object({
  target_gap_skill: z.string(),
  project_title: z.string(),
  timeline_days: z.number().default(7),
  architecture_summary: z.string(),
  key_deliverables: z.array(z.string()),
  learning_resources: z.array(
    z.object({
      title: z.string(),
      url: z.string()
    })
  )
});

export const TailoredBulletSchema = z.object({
  original_bullet: z.string(),
  tailored_bullet: z.string(),
  targeted_skill: z.string(),
  enhancement_type: z.enum(["KEYWORD_ALIGNMENT", "QUANTIFICATION", "IMPACT_REFRAME"])
});

export const TalentASTResponseSchema = z.object({
  role_title: z.string(),
  overall_match_score: z.number().min(0).max(100),
  category_scores: z.record(z.string(), z.number()), // e.g. { "Backend": 85, "DevOps": 40 }
  competencies: z.array(CompetencySchema),
  tailored_resume_markdown: z.string(),
  tailored_bullet_patches: z.array(TailoredBulletSchema),
  proof_of_work_plans: z.array(ProofOfWorkSchema)
});

export type TalentASTResponse = z.infer<typeof TalentASTResponseSchema>;
export type Competency = z.infer<typeof CompetencySchema>;
export type ProofOfWorkPlan = z.infer<typeof ProofOfWorkSchema>;
export type TailoredBullet = z.infer<typeof TailoredBulletSchema>;
