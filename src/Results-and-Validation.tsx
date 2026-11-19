import { useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleQuestionMark,
  FileText,
  FolderKanban,
  House,
  LayoutTemplate,
  Sparkles,
  Wind,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Badge,
  Button,
  ButtonIcon,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/flowcn";

import "./9027e135-1aca-4d20-85f1-461326d771c6.css";
import "./Results-and-Validation.screen.css";

export default function ResultsAndValidation() {
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
                <span className="font-medium text-foreground">{`Results & validation`}</span>
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
                      <h1 className="font-semibold text-3xl tracking-tight">
                        Results and validation
                      </h1>
                      <Badge className="bg-accent text-accent-foreground">
                        Converged
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      The simulation reached the target residual and is ready
                      for engineering review.
                    </p>
                  </div>
                </div>
                <div className="grid gap-6 grid-cols-5">
                  <Card className="col-span-3 overflow-hidden">
                    <CardHeader>
                      <CardTitle>3D flow visualization</CardTitle>
                      <CardDescription>
                        Interactive result field for the converged solution.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="rounded-lg bg-muted relative h-80 overflow-hidden">
                        <img
                          src={`${import.meta.env.BASE_URL}assets/generated/e7ff1ee0-742e-46eb-808f-3730a2a68983.jpg`}
                          alt="Pressure coefficient visualization of the NACA 2412 wing"
                          className="size-full object-cover"
                        />
                        <div className="bg-linear-to-t from-black/70 via-black/30 to-transparent absolute inset-x-0 bottom-0 px-4 pt-10 pb-4">
                          <span className="font-medium text-white text-sm">
                            Pressure coefficient · Iteration 500
                          </span>
                        </div>
                      </div>
                      <Tabs orientation="horizontal" defaultValue="Pressure">
                        <TabsList className="w-fit">
                          <TabsTrigger value="Pressure">Pressure</TabsTrigger>
                          <TabsTrigger value="Velocity">Velocity</TabsTrigger>
                          <TabsTrigger value="Streamlines">
                            Streamlines
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardContent>
                  </Card>
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Key metrics</CardTitle>
                      <CardDescription>
                        Final aerodynamic coefficients
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                      <div className="rounded-lg bg-muted border border-border p-5">
                        <span className="text-muted-foreground text-sm">
                          Lift coefficient
                        </span>
                        <div className="font-semibold text-primary text-4xl tracking-tight mt-2">
                          0.842
                        </div>
                      </div>
                      <div className="rounded-lg bg-muted border border-border p-5">
                        <span className="text-muted-foreground text-sm">
                          Drag coefficient
                        </span>
                        <div className="font-semibold text-foreground text-4xl tracking-tight mt-2">
                          0.031
                        </div>
                      </div>
                      <div className="border-x-border border-t border-t-border border-b-border flex pt-5 justify-between items-center">
                        <span className="text-muted-foreground text-sm">
                          Lift-to-drag ratio
                        </span>
                        <span className="font-semibold text-2xl">27.2</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-6 grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pressure distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="rounded-md flex h-4 overflow-hidden">
                        <div className="bg-primary w-1/3" />
                        <div className="bg-accent w-1/3" />
                        <div className="bg-chart-3 w-1/3" />
                      </div>
                      <div className="text-muted-foreground text-xs flex justify-between">
                        <span>Low pressure</span>
                        <span>High pressure</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Velocity field</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-3">
                      <div className="rounded-lg bg-accent text-accent-foreground flex justify-center items-center size-10">
                        <Wind className="size-5" />
                      </div>
                      <span className="text-muted-foreground text-sm">
                        Peak surface velocity 72.4 m/s
                      </span>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Validation status</CardTitle>
                    </CardHeader>
                    <CardContent className="rounded-lg bg-accent flex p-4 gap-3">
                      <CircleCheck className="text-primary mt-0.5 shrink-0 size-5" />
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">Ready for review</span>
                        <span className="text-muted-foreground text-sm">
                          Residuals below 1e-5 and force monitors stable over
                          the final 80 iterations.
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Engineering observations</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <ul className="list-disc text-muted-foreground text-sm flex pl-5 flex-col gap-2">
                      <li>
                        Upper-surface suction peak is consistent with the target
                        angle of attack.
                      </li>
                      <li>
                        Pressure recovery remains smooth across the aft section.
                      </li>
                      <li>
                        Force monitors show stable lift and drag throughout
                        convergence.
                      </li>
                    </ul>
                    <Accordion defaultValue={["criteria"]}>
                      <AccordionItem value="criteria">
                        <AccordionHeader>
                          <AccordionTrigger>
                            Validation details
                          </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionPanel>
                          <AccordionContent className="text-muted-foreground text-sm flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <Check className="text-primary size-4" />
                              Convergence criteria
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="text-primary size-4" />
                              Reference data comparison
                            </div>
                          </AccordionContent>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
                <div className="border-x-border border-t border-t-border border-b-border flex pt-6 justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/simulation-execution")}
                  >
                    Back to execution
                  </Button>
                  <Button onClick={() => navigate("/engineering-report")}>
                    <ButtonIcon icon={FileText} className="size-4" />
                    Generate engineering report
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
