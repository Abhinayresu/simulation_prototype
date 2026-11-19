import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleQuestionMark,
  Clock,
  FolderKanban,
  House,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";
import {
  Badge,
  Button,
  ButtonEndIcon,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/flowcn";

import "./9027e135-1aca-4d20-85f1-461326d771c6.css";
import "./Simulation-Planning.screen.css";

export default function SimulationPlanning() {
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
                <span className="text-muted-foreground">New simulation</span>
                <ChevronRight className="text-muted-foreground size-4" />
                <span className="font-medium text-foreground">
                  Simulation planning
                </span>
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
              <div className="flex mx-auto flex-col gap-6 max-w-5xl">
                <div>
                  <h1 className="font-semibold text-foreground text-3xl tracking-tight">
                    Recommended simulation approach
                  </h1>
                  <p className="text-muted-foreground text-base mt-2">
                    Based on the assessment, this setup balances accuracy,
                    stability, and turnaround time.
                  </p>
                </div>
                <div className="border-t-border border-r-border border-b border-b-border border-l-border grid pb-6 gap-4 grid-cols-4">
                  <div className="text-center flex flex-col items-center gap-2">
                    <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                      1
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Problem Definition
                    </span>
                  </div>
                  <div className="text-center flex flex-col items-center gap-2">
                    <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                      2
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Simulation Planning
                    </span>
                  </div>
                  <div className="text-center flex flex-col items-center gap-2">
                    <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-8">
                      3
                    </div>
                    <span className="font-semibold text-foreground text-sm">
                      Execution
                    </span>
                  </div>
                  <div className="text-center flex flex-col items-center gap-2">
                    <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                      4
                    </div>
                    <span className="text-muted-foreground text-sm">{`Results & Validation`}</span>
                  </div>
                </div>
                <Card className="shadow-sm bg-accent/40 border-primary/30">
                  <CardContent className="flex p-6 justify-between items-start gap-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary text-primary-foreground flex justify-center items-center shrink-0 size-11">
                        <Sparkles className="size-5" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className="w-fit">Recommended</Badge>
                        <h2 className="font-semibold text-foreground text-xl">
                          Steady external aerodynamics
                        </h2>
                        <p className="text-muted-foreground text-sm max-w-2xl">
                          A robust first-pass setup for the NACA 2412 wing at 50
                          m/s and 5° angle of attack.
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Inspect technical reasoning
                    </Button>
                  </CardContent>
                </Card>
                <div className="grid gap-4 grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Solver</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-foreground text-lg">
                        Pressure-based steady
                      </p>
                      <p className="text-muted-foreground text-sm mt-2">
                        SIMPLE pressure-velocity coupling
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Turbulence model</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-foreground text-lg">
                        k–ω SST
                      </p>
                      <p className="text-muted-foreground text-sm mt-2">
                        Good separation and adverse-pressure-gradient behaviour
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Boundary conditions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                      <div className="text-sm border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-center">
                        <span className="text-muted-foreground">Inlet</span>
                        <span className="font-medium text-foreground">
                          50 m/s velocity inlet
                        </span>
                      </div>
                      <div className="text-sm border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-center">
                        <span className="text-muted-foreground">Outlet</span>
                        <span className="font-medium text-foreground">
                          0 Pa pressure outlet
                        </span>
                      </div>
                      <div className="text-sm flex justify-between items-center">
                        <span className="text-muted-foreground">Walls</span>
                        <span className="font-medium text-foreground">
                          No-slip
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Mesh strategy</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                      <p className="font-semibold text-foreground text-lg">
                        Hybrid polyhedral
                      </p>
                      <div className="text-sm border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-center">
                        <span className="text-muted-foreground">Base size</span>
                        <span className="font-medium text-foreground">
                          6 mm
                        </span>
                      </div>
                      <div className="text-sm border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-center">
                        <span className="text-muted-foreground">
                          Surface refinement
                        </span>
                        <span className="font-medium text-foreground">
                          2 mm
                        </span>
                      </div>
                      <div className="text-sm flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Prism layers
                        </span>
                        <span className="font-medium text-foreground">
                          12 layers
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card className="ml-auto w-fit">
                  <CardContent className="flex px-5 py-4 items-center gap-3">
                    <Clock className="text-primary size-5" />
                    <span className="font-medium text-foreground text-sm">
                      Estimated runtime 18–25 minutes
                    </span>
                  </CardContent>
                </Card>
                <div className="border-x-border border-t border-t-border border-b-border flex pt-6 justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/engineering-assessment")}
                  >
                    Back to assessment
                  </Button>
                  <Button onClick={() => navigate("/review-and-approval")}>
                    Review configuration{" "}
                    <ButtonEndIcon icon={ArrowRight} className="size-4" />
                  </Button>
                </div>
              </div>
            </main>
          </section>
        </div>
        <Dialog defaultOpen={false}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Technical reasoning</DialogTitle>
              <DialogDescription>
                Steady external aerodynamics with a pressure-based solver and
                k–ω SST model provides a stable first-pass assessment for the
                wing operating condition.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
