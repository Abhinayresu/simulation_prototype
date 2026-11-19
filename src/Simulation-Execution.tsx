import { useNavigate } from "react-router-dom";
import {
  Activity,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Circle,
  CircleCheck,
  CircleQuestionMark,
  FolderKanban,
  House,
  LayoutTemplate,
  LoaderCircle,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import {
  Badge,
  Button,
  ButtonIcon,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Progress,
} from "@/components/flowcn";
import { ChartContainer } from "@/components/ui/chart";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from "recharts";

import "./9027e135-1aca-4d20-85f1-461326d771c6.css";
import "./Simulation-Execution.screen.css";

export default function SimulationExecution() {
  const navigate = useNavigate();
  return (
    <div data-appearance="light">
      <div className="bg-background text-foreground w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="bg-background text-foreground flex w-full min-h-screen">
          <aside className="bg-sidebar border-y-border border-r border-r-border border-l-border flex px-4 py-6 flex-col shrink-0 w-62">
            <div className="flex px-2 items-center gap-3">
              <div className="rounded-full bg-primary text-primary-foreground flex justify-center items-center size-9">
                <Sparkles className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground text-base tracking-tight">
                  EngineerMind AI
                </span>
                <span className="text-muted-foreground text-xs">
                  Think · Simulate · Validate
                </span>
              </div>
            </div>
            <nav
              aria-label="Primary navigation"
              className="flex mt-10 flex-col gap-2"
            >
              <a
                href="#"
                className="font-medium rounded-lg text-muted-foreground text-sm flex p-3 items-center gap-3 hover:bg-accent hover:text-foreground"
                onClick={() => navigate("/engineermind-home")}
              >
                <House className="size-5" />
                <span>Home</span>
              </a>
              <a
                href="#"
                aria-current="page"
                className="font-medium rounded-lg bg-primary text-primary-foreground text-sm flex p-3 items-center gap-3"
              >
                <FolderKanban className="size-5" />
                <span>Projects</span>
              </a>
              <a
                href="#"
                className="font-medium rounded-lg text-muted-foreground text-sm flex p-3 items-center gap-3 hover:bg-accent hover:text-foreground"
              >
                <LayoutTemplate className="size-5" />
                <span>Templates</span>
              </a>
              <a
                href="#"
                className="font-medium rounded-lg text-muted-foreground text-sm flex p-3 items-center gap-3 hover:bg-accent hover:text-foreground"
              >
                <BookOpen className="size-5" />
                <span>Knowledge base</span>
              </a>
            </nav>
            <div className="flex mt-auto flex-col gap-5">
              <a
                href="#"
                className="font-medium rounded-lg text-muted-foreground text-sm flex p-3 items-center gap-3 hover:bg-accent hover:text-foreground"
              >
                <CircleQuestionMark className="size-5" />
                <span>Help</span>
              </a>
              <div className="border-x-border border-t border-t-border border-b-border flex px-2 pt-5 items-center gap-3">
                <div className="font-semibold rounded-full bg-muted text-foreground text-sm flex justify-center items-center size-9">
                  EC
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-ellipsis whitespace-nowrap text-foreground text-sm overflow-hidden">
                    Evan Carter
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Engineer
                  </span>
                </div>
                <ChevronDown className="text-muted-foreground ml-auto shrink-0 size-4" />
              </div>
            </div>
          </aside>
          <section className="flex flex-col flex-1 min-w-0">
            <header className="bg-background border-t-border border-r-border border-b border-b-border border-l-border flex px-8 justify-between items-center h-16">
              <div className="text-sm flex items-center gap-2">
                <span className="text-muted-foreground">NACA 2412 wing</span>
                <ChevronRight className="text-muted-foreground size-4" />
                <span className="font-medium text-foreground">Execution</span>
              </div>
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="rounded-lg text-muted-foreground p-2 hover:bg-accent hover:text-foreground"
                >
                  <Bell className="size-5" />
                </button>
                <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-9">
                  EC
                </div>
              </div>
            </header>
            <main className="p-8 flex-1 overflow-auto">
              <div className="flex mx-auto flex-col gap-6 max-w-6xl">
                <div className="flex justify-between items-start gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h1 className="font-semibold text-foreground text-3xl tracking-tight">
                        Simulation in progress
                      </h1>
                      <Badge>Running</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      EngineerMind is solving your case and monitoring
                      convergence.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="secondary">
                      <ButtonIcon icon={Pause} className="size-4" />
                      <Play className="hidden size-4" />
                      Pause simulation
                    </Button>
                    <Button
                      onClick={() => navigate("/results-and-validation")}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      View Results & Validation
                    </Button>
                  </div>
                </div>
                <Card className="p-6">
                  <CardContent className="flex px-0 flex-col gap-4">
                    <div className="flex justify-between items-center gap-8">
                      <div className="flex flex-col flex-1 gap-4 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-primary/10 text-primary flex justify-center items-center size-10">
                            <Activity className="size-5" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-foreground text-lg">
                              Iteration 184 of 500
                            </span>
                            <span className="text-muted-foreground text-sm">
                              Estimated time remaining 12 min
                            </span>
                          </div>
                        </div>
                        <Progress value={37} />
                        <div className="text-muted-foreground text-xs flex justify-between">
                          <span>37% complete</span>
                          <span>Convergence monitoring active</span>
                        </div>
                      </div>
                      <div className="text-center rounded-full bg-accent border-8 border-primary/10 flex flex-col justify-center items-center shrink-0 size-32">
                        <span className="text-muted-foreground text-xs">
                          Residual target
                        </span>
                        <span className="font-semibold text-foreground text-xl mt-1">
                          {"< 1e-5"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid gap-6 grid-cols-3">
                  <Card className="p-6 col-span-2">
                    <CardHeader className="p-0">
                      <CardTitle>Residual convergence</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pt-6 pb-0">
                      <ChartContainer
                        config={{
                          continuity: {
                            label: "Continuity",
                            color: "var(--color-chart-1)",
                          },
                          xVelocity: {
                            label: "X-velocity",
                            color: "var(--color-chart-2)",
                          },
                          yVelocity: {
                            label: "Y-velocity",
                            color: "var(--color-chart-3)",
                          },
                        }}
                        className="w-full h-64"
                      >
                        <RechartsLineChart
                          data={[
                            {
                              iteration: "0",
                              continuity: 0.92,
                              xVelocity: 0.78,
                              yVelocity: 0.86,
                            },
                            {
                              iteration: "40",
                              continuity: 0.68,
                              xVelocity: 0.59,
                              yVelocity: 0.65,
                            },
                            {
                              iteration: "80",
                              continuity: 0.48,
                              xVelocity: 0.42,
                              yVelocity: 0.47,
                            },
                            {
                              iteration: "120",
                              continuity: 0.31,
                              xVelocity: 0.28,
                              yVelocity: 0.32,
                            },
                            {
                              iteration: "160",
                              continuity: 0.18,
                              xVelocity: 0.16,
                              yVelocity: 0.19,
                            },
                            {
                              iteration: "184",
                              continuity: 0.12,
                              xVelocity: 0.1,
                              yVelocity: 0.13,
                            },
                          ]}
                        >
                          <CartesianGrid
                            vertical={false}
                            stroke="var(--color-border)"
                          />
                          <XAxis
                            dataKey="iteration"
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            domain={[0, 1]}
                            ticks={[0, 0.25, 0.5, 0.75, 1]}
                            width={36}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="continuity"
                            name="Continuity"
                            stroke="var(--color-chart-1)"
                            strokeWidth={2}
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="xVelocity"
                            name="X-velocity"
                            stroke="var(--color-chart-2)"
                            strokeWidth={2}
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="yVelocity"
                            name="Y-velocity"
                            stroke="var(--color-chart-3)"
                            strokeWidth={2}
                            dot={false}
                          />
                          <Legend />
                        </RechartsLineChart>
                      </ChartContainer>
                      <p className="text-muted-foreground text-xs mt-4">
                        All residuals are trending downward.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="p-6">
                    <CardHeader className="p-0">
                      <CardTitle>Execution status</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pt-6 pb-0">
                      <div className="flex flex-col">
                        <div className="border-y-primary border-r-primary border-l-2 border-l-primary flex py-1 pl-4 gap-3">
                          <div className="flex flex-col flex-1 gap-1">
                            <span className="font-medium text-foreground text-sm">
                              Pre-processing
                            </span>
                            <span className="text-muted-foreground text-xs">
                              Complete
                            </span>
                          </div>
                          <CircleCheck className="text-primary size-5" />
                        </div>
                        <div className="border-y-primary border-r-primary border-l-2 border-l-primary flex py-4 pl-4 gap-3">
                          <div className="flex flex-col flex-1 gap-1">
                            <span className="font-medium text-foreground text-sm">
                              Mesh check
                            </span>
                            <span className="text-muted-foreground text-xs">
                              Complete
                            </span>
                          </div>
                          <CircleCheck className="text-primary size-5" />
                        </div>
                        <div className="border-y-primary border-r-primary border-l-2 border-l-primary flex py-4 pl-4 gap-3">
                          <div className="flex flex-col flex-1 gap-1">
                            <span className="font-medium text-foreground text-sm">
                              Flow solver
                            </span>
                            <span className="text-xs">In progress</span>
                          </div>
                          <LoaderCircle className="animate-spin text-primary size-5" />
                        </div>
                        <div className="border-y-border border-r-border border-l-2 border-l-border flex py-1 pl-4 gap-3">
                          <div className="flex flex-col flex-1 gap-1">
                            <span className="font-medium text-foreground text-sm">
                              Post-processing
                            </span>
                            <span className="text-muted-foreground text-xs">
                              Queued
                            </span>
                          </div>
                          <Circle className="text-muted-foreground size-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Collapsible defaultOpen>
                  <Card className="p-6">
                    <CardContent className="flex px-0 flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <CardTitle>Solver logs</CardTitle>
                        <CollapsibleTrigger
                          aria-label="Toggle solver logs"
                          render={<Button variant="ghost" size="icon-sm" />}
                        >
                          <ButtonIcon icon={ChevronDown} className="size-4" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="font-mono rounded-lg bg-foreground text-background text-xs leading-6 mt-4 p-4">
                          <div>[09:41:12] Iteration 184 completed</div>
                          <div>[09:41:13] Continuity residual 2.4e-04</div>
                          <div>[09:41:13] CFL adjusted to 4.0</div>
                          <div>[09:41:14] Monitoring lift and drag</div>
                        </div>
                      </CollapsibleContent>
                    </CardContent>
                  </Card>
                </Collapsible>
                <div className="border-t border-border flex pt-6 justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/review-and-approval")}
                  >
                    Back to Approval
                  </Button>
                  <Button
                    onClick={() => navigate("/results-and-validation")}
                  >
                    Proceed to Results and Validation →
                  </Button>
                </div>
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
}
