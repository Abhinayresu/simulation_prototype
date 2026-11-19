import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleQuestionMark,
  FolderKanban,
  House,
  Info,
  LayoutTemplate,
  Pencil,
  Play,
  Sparkles,
} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  BadgeIcon,
  Button,
  ButtonIcon,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/flowcn";

import "./9027e135-1aca-4d20-85f1-461326d771c6.css";
import "./Review-and-Approval.screen.css";

export default function ReviewAndApproval() {
  const navigate = useNavigate();
  return (
    <div data-appearance="light">
      <div className="bg-background text-foreground flex w-full h-fit min-h-screen h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
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
                <span className="text-muted-foreground text-xs">Engineer</span>
              </div>
              <ChevronDown className="text-muted-foreground ml-auto shrink-0 size-4" />
            </div>
          </div>
        </aside>
        <section className="flex flex-col flex-1 min-w-0">
          <header className="bg-background border-t-border border-r-border border-b border-b-border border-l-border flex px-8 justify-between items-center h-16">
            <div className="text-sm flex items-center gap-2">
              <span className="text-muted-foreground">New simulation</span>
              <ChevronRight className="text-muted-foreground size-4" />
              <span className="font-medium text-foreground">{`Review & approval`}</span>
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
          <main className="p-8 flex-1">
            <div className="flex mx-auto flex-col gap-8 max-w-6xl">
              <div className="flex justify-between items-start gap-6">
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-foreground text-3xl tracking-tight">
                    Review and approve your simulation
                  </h1>
                  <p className="text-muted-foreground text-base">
                    Check the configuration once more. You can edit any
                    parameter before execution.
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="text-primary mt-1 px-3 py-1.5 gap-2"
                >
                  <BadgeIcon icon={CircleCheck} className="size-4" />
                  Ready to run
                </Badge>
              </div>
              <div className="flex relative px-8 justify-between items-start">
                <div className="bg-border absolute inset-x-16 top-4 h-px" />
                <div className="text-center flex relative z-10 flex-col items-center gap-2 w-32">
                  <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-8">
                    <Check className="size-4" />
                  </div>
                  <span className="font-medium text-muted-foreground text-xs">
                    Define problem
                  </span>
                </div>
                <div className="text-center flex relative z-10 flex-col items-center gap-2 w-32">
                  <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-8">
                    <Check className="size-4" />
                  </div>
                  <span className="font-medium text-muted-foreground text-xs">
                    Plan simulation
                  </span>
                </div>
                <div className="text-center flex relative z-10 flex-col items-center gap-2 w-32">
                  <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-8">
                    <Check className="size-4" />
                  </div>
                  <span className="font-medium text-muted-foreground text-xs">
                    Configure execution
                  </span>
                </div>
                <div className="text-center flex relative z-10 flex-col items-center gap-2 w-32">
                  <div className="font-semibold rounded-full bg-background text-primary text-sm border-2 border-primary flex justify-center items-center size-8">
                    4
                  </div>
                  <span className="font-semibold text-foreground text-xs">{`Review & approval`}</span>
                </div>
              </div>
              <div className="grid items-start gap-6 grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Simulation configuration</CardTitle>
                    <CardDescription>
                      Review the parameters that will be used for this run.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-0">
                    <div className="border-x-border border-t border-t-border border-b-border flex py-4 justify-between items-center">
                      <div className="flex flex-col flex-1 gap-1 min-w-0">
                        <span className="font-medium text-foreground text-sm">
                          Objective
                        </span>
                        <Input
                          defaultValue="Aerodynamic performance of NACA 2412 wing"
                          className="hidden max-w-lg"
                        />
                        <span className="text-muted-foreground text-sm">
                          Aerodynamic performance of NACA 2412 wing
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ButtonIcon icon={Pencil} className="size-4" />
                        Edit
                      </Button>
                    </div>
                    <div className="border-x-border border-t border-t-border border-b-border flex py-4 justify-between items-center">
                      <div className="flex flex-col flex-1 gap-1 min-w-0">
                        <span className="font-medium text-foreground text-sm">
                          Geometry
                        </span>
                        <Input
                          defaultValue="NACA_2412_wing.stl"
                          className="hidden max-w-lg"
                        />
                        <span className="text-muted-foreground text-sm">
                          NACA_2412_wing.stl{" "}
                          <span className="text-xs">· 2.4 MB</span>
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ButtonIcon icon={Pencil} className="size-4" />
                        Edit
                      </Button>
                    </div>
                    <div className="border-x-border border-t border-t-border border-b-border flex py-4 justify-between items-center">
                      <div className="flex flex-col flex-1 gap-1 min-w-0">
                        <span className="font-medium text-foreground text-sm">
                          Flow
                        </span>
                        <Select
                          className="hidden"
                          defaultValue="50 m/s · 5° AoA · 288 K"
                          items={[
                            {
                              value: "50 m/s · 5° AoA · 288 K",
                              label: "50 m/s · 5° AoA · 288 K",
                            },
                            {
                              value: "40 m/s · 0° AoA · 288 K",
                              label: "40 m/s · 0° AoA · 288 K",
                            },
                          ]}
                        >
                          <SelectTrigger className="max-w-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50 m/s · 5° AoA · 288 K">
                              50 m/s · 5° AoA · 288 K
                            </SelectItem>
                            <SelectItem value="40 m/s · 0° AoA · 288 K">
                              40 m/s · 0° AoA · 288 K
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-muted-foreground text-sm">
                          50 m/s · 5° AoA · 288 K
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ButtonIcon icon={Pencil} className="size-4" />
                        Edit
                      </Button>
                    </div>
                    <div className="border-x-border border-t border-t-border border-b-border flex py-4 justify-between items-center">
                      <div className="flex flex-col flex-1 gap-1 min-w-0">
                        <span className="font-medium text-foreground text-sm">
                          Solver
                        </span>
                        <Select
                          className="hidden"
                          defaultValue="Pressure-based steady"
                          items={[
                            {
                              value: "Pressure-based steady",
                              label: "Pressure-based steady",
                            },
                            {
                              value: "Density-based steady",
                              label: "Density-based steady",
                            },
                          ]}
                        >
                          <SelectTrigger className="max-w-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pressure-based steady">
                              Pressure-based steady
                            </SelectItem>
                            <SelectItem value="Density-based steady">
                              Density-based steady
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-muted-foreground text-sm">
                          Pressure-based steady
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ButtonIcon icon={Pencil} className="size-4" />
                        Edit
                      </Button>
                    </div>
                    <div className="border-x-border border-t border-t-border border-b-border flex py-4 justify-between items-center">
                      <div className="flex flex-col flex-1 gap-1 min-w-0">
                        <span className="font-medium text-foreground text-sm">
                          Turbulence
                        </span>
                        <Select
                          className="hidden"
                          defaultValue="k–ω SST"
                          items={[
                            { value: "k–ω SST", label: "k–ω SST" },
                            {
                              value: "k–ε realizable",
                              label: "k–ε realizable",
                            },
                          ]}
                        >
                          <SelectTrigger className="max-w-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="k–ω SST">k–ω SST</SelectItem>
                            <SelectItem value="k–ε realizable">
                              k–ε realizable
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-muted-foreground text-sm">
                          k–ω SST
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ButtonIcon icon={Pencil} className="size-4" />
                        Edit
                      </Button>
                    </div>
                    <div className="border-x-border border-y border-y-border flex py-4 justify-between items-center">
                      <div className="flex flex-col flex-1 gap-1 min-w-0">
                        <span className="font-medium text-foreground text-sm">
                          Mesh
                        </span>
                        <Select
                          className="hidden"
                          defaultValue="Hybrid polyhedral · y+ 1–5"
                          items={[
                            {
                              value: "Hybrid polyhedral · y+ 1–5",
                              label: "Hybrid polyhedral · y+ 1–5",
                            },
                            {
                              value: "Tetrahedral · y+ 5–30",
                              label: "Tetrahedral · y+ 5–30",
                            },
                          ]}
                        >
                          <SelectTrigger className="max-w-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hybrid polyhedral · y+ 1–5">
                              Hybrid polyhedral · y+ 1–5
                            </SelectItem>
                            <SelectItem value="Tetrahedral · y+ 5–30">
                              Tetrahedral · y+ 5–30
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-muted-foreground text-sm">
                          Hybrid polyhedral · y+ 1–5
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ButtonIcon icon={Pencil} className="size-4" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Before you run</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="text-foreground text-sm flex items-center gap-3">
                      <CircleCheck className="text-primary size-5" />
                      Geometry is watertight
                    </div>
                    <div className="text-foreground text-sm flex items-center gap-3">
                      <CircleCheck className="text-primary size-5" />
                      Reference area is defined
                    </div>
                    <div className="text-foreground text-sm flex items-center gap-3">
                      <CircleCheck className="text-primary size-5" />
                      Outputs include lift and drag
                    </div>
                    <Alert className="mt-2">
                      <AlertIcon icon={Info} className="size-4" />
                      <AlertDescription>
                        You can stop the run at any time.
                      </AlertDescription>
                    </Alert>
                    <div className="border-x-border border-t border-t-border border-b-border flex pt-5 items-start gap-3">
                      <Checkbox id="approval" defaultChecked={false} />
                      <Label
                        htmlFor="approval"
                        className="text-foreground text-sm leading-5"
                      >
                        I’ve reviewed the setup and approve this simulation.
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="border-x-border border-t border-t-border border-b-border flex pt-6 justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => navigate("/simulation-planning")}
                >
                  <ButtonIcon icon={ArrowLeft} className="size-4" />
                  Back to planning
                </Button>
                <Button
                  disabled
                  onClick={() => navigate("/simulation-execution")}
                >
                  <ButtonIcon icon={Play} className="size-4" />
                  Approve and run simulation
                </Button>
              </div>
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}
