import { useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleQuestionMark,
  Download,
  FolderKanban,
  House,
  LayoutTemplate,
  Share,
  Sparkles,
} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Button,
  ButtonIcon,
  Card,
  CardContent,
  CardDescription,
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
import "./Engineering-Report.screen.css";

export default function EngineeringReport() {
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
                <span className="font-medium text-foreground">
                  Engineering report
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
            <main className="p-8 flex-1 overflow-y-auto">
              <div className="flex mx-auto flex-col gap-6 max-w-5xl">
                <div className="flex justify-between items-start gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <h1 className="font-semibold whitespace-nowrap text-foreground text-3xl tracking-tight">
                        Engineering report
                      </h1>
                      <Badge className="bg-primary/10 text-primary">
                        Validated
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-base max-w-2xl">
                      A concise record of the objective, method, results, and
                      engineering judgement.
                    </p>
                  </div>
                  <div className="flex items-center shrink-0 gap-3">
                    <Badge variant="secondary" className="hidden">
                      PDF ready
                    </Badge>
                    <Button variant="outline">
                      <ButtonIcon icon={Download} className="size-4" />
                      Download PDF
                    </Button>
                    <Button>
                      <ButtonIcon icon={Share} className="size-4" />
                      Export report
                    </Button>
                  </div>
                </div>
                <Card className="shadow-sm">
                  <CardHeader className="border-t-border border-r-border border-b border-b-border border-l-border pb-6 gap-3">
                    <span className="font-semibold text-primary text-xs tracking-[0.18em]">
                      ENGINEERMIND AI · CFD REPORT
                    </span>
                    <CardTitle className="text-2xl">
                      Aerodynamic performance of NACA 2412 wing
                    </CardTitle>
                    <CardDescription>
                      Prepared for Abhinay Kumar · 18 June 2024 · Case EM-2048
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex pt-8 flex-col gap-8">
                    <section className="flex flex-col gap-3">
                      <h2 className="font-semibold text-foreground text-lg">
                        1. Objective
                      </h2>
                      <p className="text-muted-foreground text-sm leading-6 max-w-4xl">
                        Evaluate the aerodynamic performance of the NACA 2412
                        wing section under representative subsonic flow
                        conditions, with emphasis on lift generation, drag, and
                        overall aerodynamic efficiency.
                      </p>
                    </section>
                    <section className="flex flex-col gap-4">
                      <h2 className="font-semibold text-foreground text-lg">
                        2. Simulation setup
                      </h2>
                      <dl className="rounded-lg bg-muted/40 border border-border grid p-5 gap-x-12 gap-y-4 grid-cols-2">
                        <div className="flex flex-col gap-1">
                          <dt className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                            Geometry
                          </dt>
                          <dd className="font-medium text-foreground text-sm">
                            NACA 2412 wing profile
                          </dd>
                        </div>
                        <div className="flex flex-col gap-1">
                          <dt className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                            Solver
                          </dt>
                          <dd className="font-medium text-foreground text-sm">
                            Steady RANS, pressure-based
                          </dd>
                        </div>
                        <div className="flex flex-col gap-1">
                          <dt className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                            Turbulence model
                          </dt>
                          <dd className="font-medium text-foreground text-sm">
                            k-ω SST
                          </dd>
                        </div>
                        <div className="flex flex-col gap-1">
                          <dt className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                            Flow conditions
                          </dt>
                          <dd className="font-medium text-foreground text-sm">
                            50 m/s · 5° angle of attack
                          </dd>
                        </div>
                        <div className="flex flex-col gap-1">
                          <dt className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                            Mesh
                          </dt>
                          <dd className="font-medium text-foreground text-sm">
                            Structured boundary-layer mesh
                          </dd>
                        </div>
                      </dl>
                    </section>
                    <section className="flex flex-col gap-4">
                      <h2 className="font-semibold text-foreground text-lg">
                        3. Results
                      </h2>
                      <div className="grid gap-4 grid-cols-3">
                        <Card size="sm" className="bg-muted/40">
                          <CardContent className="flex p-5 flex-col gap-1">
                            <span className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                              CL
                            </span>
                            <span className="font-semibold text-foreground text-2xl">
                              0.842
                            </span>
                          </CardContent>
                        </Card>
                        <Card size="sm" className="bg-muted/40">
                          <CardContent className="flex p-5 flex-col gap-1">
                            <span className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                              CD
                            </span>
                            <span className="font-semibold text-foreground text-2xl">
                              0.031
                            </span>
                          </CardContent>
                        </Card>
                        <Card size="sm" className="bg-muted/40">
                          <CardContent className="flex p-5 flex-col gap-1">
                            <span className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                              L/D
                            </span>
                            <span className="font-semibold text-foreground text-2xl">
                              27.2
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                      <img
                        src="/assets/generated/e7ff1ee0-742e-46eb-808f-3730a2a68983.jpg"
                        alt="CFD result thumbnail"
                        className="rounded-lg border border-border w-full h-40 object-cover"
                      />
                    </section>
                    <section className="flex flex-col gap-3">
                      <h2 className="font-semibold text-foreground text-lg">
                        4. Engineering observations
                      </h2>
                      <ul className="list-disc text-muted-foreground text-sm leading-6 flex pl-5 flex-col gap-2">
                        <li>
                          Lift generation is strong and consistent with the
                          selected positive camber profile.
                        </li>
                        <li>
                          Drag remains low at the evaluated angle of attack,
                          producing an efficient lift-to-drag ratio.
                        </li>
                        <li>
                          The converged flow field indicates attached flow
                          across most of the upper surface.
                        </li>
                      </ul>
                    </section>
                    <section className="flex flex-col gap-3">
                      <h2 className="font-semibold text-foreground text-lg">
                        5. Validation status
                      </h2>
                      <Alert className="bg-primary/10 border-primary/30">
                        <AlertIcon
                          icon={CircleCheck}
                          className="text-primary size-4"
                        />
                        <AlertTitle>Simulation validated</AlertTitle>
                        <AlertDescription>
                          Residuals reduced below 1e-5 and monitored force
                          coefficients remained stable over the final
                          iterations.
                        </AlertDescription>
                      </Alert>
                    </section>
                    <section className="flex flex-col gap-3">
                      <h2 className="font-semibold text-foreground text-lg">
                        6. Limitations
                      </h2>
                      <ul className="list-disc text-muted-foreground text-sm leading-6 flex pl-5 flex-col gap-2">
                        <li>
                          The analysis assumes an idealised freestream and does
                          not capture site-specific atmospheric variation.
                        </li>
                        <li>
                          No experimental correlation data was available for
                          direct comparison with the reported coefficients.
                        </li>
                      </ul>
                    </section>
                    <div className="border-x-border border-t border-t-border border-b-border pt-6">
                      <p className="text-muted-foreground text-xs leading-5">
                        This report is an engineering aid and should be reviewed
                        against project-specific acceptance criteria.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </main>
          </section>
        </div>
        <Dialog defaultOpen={false}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report export ready</DialogTitle>
              <DialogDescription>
                Your engineering report has been prepared for export.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Close</Button>
              <Button>
                <ButtonIcon icon={Download} className="size-4" />
                Download PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
