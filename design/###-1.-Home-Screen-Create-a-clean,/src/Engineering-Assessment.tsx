import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleQuestionMark,
  Crosshair,
  Dot as LucideDot,
  FolderKanban,
  Gauge,
  House,
  LayoutTemplate,
  Sparkles,
  WavesHorizontal,
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
  ButtonEndIcon,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemMediaIcon,
  ItemTitle,
  Link,
} from "@/components/flowcn";

import "./9027e135-1aca-4d20-85f1-461326d771c6.css";
import "./Engineering-Assessment.screen.css";

export default function EngineeringAssessment() {
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
                  Engineering assessment
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
            <main className="p-8 flex-1">
              <div className="flex mx-auto flex-col gap-8 max-w-6xl">
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-foreground text-3xl tracking-tight">
                    Engineering assessment
                  </h1>
                  <p className="text-muted-foreground text-base max-w-3xl">
                    We translated your objective into an initial CFD assessment.
                    Review the findings before we plan the simulation.
                  </p>
                </div>
                <div className="grid relative gap-4 grid-cols-4">
                  <div className="bg-border absolute inset-x-8 top-4 h-px" />
                  <div className="text-center flex relative flex-col items-center gap-2">
                    <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                      1
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Problem definition
                    </span>
                  </div>
                  <div className="text-center flex relative flex-col items-center gap-2">
                    <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-8">
                      2
                    </div>
                    <span className="font-semibold text-foreground text-sm">
                      Engineering assessment
                    </span>
                  </div>
                  <div className="text-center flex relative flex-col items-center gap-2">
                    <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                      3
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Simulation planning
                    </span>
                  </div>
                  <div className="text-center flex relative flex-col items-center gap-2">
                    <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                      4
                    </div>
                    <span className="text-muted-foreground text-sm">{`Results & validation`}</span>
                  </div>
                </div>
                <div className="rounded-lg bg-primary/10 border border-primary/20 flex px-5 py-4 items-center gap-4">
                  <div className="rounded-full bg-primary text-primary-foreground flex justify-center items-center shrink-0 size-9">
                    <Check className="size-5" />
                  </div>
                  <div className="flex flex-col flex-1 gap-1 min-w-0">
                    <span className="font-semibold text-foreground">
                      Assessment ready
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Your problem is well defined enough to continue with a
                      recommended approach.
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/problem-definition")}
                  >
                    Edit problem
                  </Button>
                </div>
                <div className="grid gap-6 grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calculated parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="text-sm border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-center">
                        <span className="text-muted-foreground">
                          Reynolds number
                        </span>
                        <span className="font-semibold text-foreground">
                          1.7M
                        </span>
                      </div>
                      <div className="text-sm border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-center">
                        <span className="text-muted-foreground">
                          Dynamic pressure
                        </span>
                        <span className="font-semibold text-foreground">
                          1,531 Pa
                        </span>
                      </div>
                      <div className="text-sm flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Flow regime
                        </span>
                        <Badge variant="secondary">Turbulent</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Important observations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-muted-foreground text-sm flex flex-col gap-4">
                        <li className="flex gap-3">
                          <LucideDot className="text-primary mt-0.5 shrink-0 size-4" />
                          <span>
                            Flow is expected to remain attached over most of the
                            upper surface
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <LucideDot className="text-primary mt-0.5 shrink-0 size-4" />
                          <span>
                            Leading-edge pressure peak will drive local mesh
                            refinement
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <LucideDot className="text-primary mt-0.5 shrink-0 size-4" />
                          <span>
                            Wake resolution is important for reliable drag
                            prediction
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Missing information</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <Badge
                        variant="outline"
                        className="text-chart-3 border-chart-3 w-fit"
                      >
                        2 items to confirm
                      </Badge>
                      <div className="text-sm border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-center">
                        <span className="text-muted-foreground">
                          Reference area
                        </span>
                        <Link variant="primary" href="#">
                          Add detail
                        </Link>
                      </div>
                      <div className="text-sm flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Far-field extent
                        </span>
                        <Link variant="primary" href="#">
                          Add detail
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ItemGroup className="flex flex-col gap-2">
                      <Item size="sm">
                        <ItemMedia variant="icon">
                          <ItemMediaIcon
                            icon={Gauge}
                            className="text-primary size-5"
                          />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>
                            Use a steady external aerodynamics setup
                          </ItemTitle>
                          <ItemDescription>
                            Begin with a steady-state approach to establish the
                            baseline flow field and aerodynamic loads.
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item size="sm">
                        <ItemMedia variant="icon">
                          <ItemMediaIcon
                            icon={WavesHorizontal}
                            className="text-primary size-5"
                          />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>
                            Start with k–ω SST turbulence modelling
                          </ItemTitle>
                          <ItemDescription>
                            This model provides a robust balance of near-wall
                            accuracy and separated-flow prediction.
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item size="sm">
                        <ItemMedia variant="icon">
                          <ItemMediaIcon
                            icon={Crosshair}
                            className="text-primary size-5"
                          />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>
                            Target y+ between 1 and 5 around the wing
                          </ItemTitle>
                          <ItemDescription>
                            Use a wall-resolved mesh target to capture
                            boundary-layer behaviour around the wing.
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    </ItemGroup>
                  </CardContent>
                </Card>
                <Accordion
                  className="rounded-lg bg-card border border-border px-6"
                  defaultValue={["parameters"]}
                >
                  <AccordionItem value="parameters">
                    <AccordionHeader>
                      <AccordionTrigger>
                        How the parameters were calculated
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionPanel>
                      <AccordionContent>
                        <p className="text-muted-foreground text-sm pb-4">
                          Reynolds number uses the reference chord, freestream
                          velocity, and air kinematic viscosity. Dynamic
                          pressure is calculated from freestream density and
                          velocity using q = ½ρV².
                        </p>
                      </AccordionContent>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem value="model">
                    <AccordionHeader>
                      <AccordionTrigger>
                        Why this model is suitable
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionPanel>
                      <AccordionContent>
                        <p className="text-muted-foreground text-sm pb-4">
                          The recommended approach is well suited to external
                          aerodynamic flows with attached boundary layers, local
                          pressure gradients, and a resolved wake.
                        </p>
                      </AccordionContent>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <div className="border-x-border border-t border-t-border border-b-border flex pt-6 justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/problem-definition")}
                  >
                    Back to problem
                  </Button>
                  <Button onClick={() => navigate("/simulation-planning")}>
                    Continue to simulation planning{" "}
                    <ButtonEndIcon icon={ArrowRight} className="size-4" />
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
