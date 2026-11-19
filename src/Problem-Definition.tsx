import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleQuestionMark,
  CloudUpload,
  File,
  FolderKanban,
  House,
  LayoutTemplate,
  Sparkles,
  X,
} from "lucide-react";
import {
  Button,
  ButtonEndIcon,
  Card,
  CardContent,
  FieldLabel,
  FieldLegend,
  FieldSet,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/flowcn";

import "./9027e135-1aca-4d20-85f1-461326d771c6.css";
import "./Problem-Definition.screen.css";

export default function ProblemDefinition() {
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
              <span className="text-muted-foreground">Workspace</span>
              <ChevronRight className="text-muted-foreground size-4" />
              <span className="font-medium text-foreground">
                New simulation / Problem definition
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
                  Define your engineering problem
                </h1>
                <p className="text-muted-foreground text-base">
                  Start with the objective. EngineerMind will use it to
                  recommend the right simulation approach.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex flex-col items-center flex-1 gap-3">
                  <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-8">
                    1
                  </div>
                  <span className="font-medium text-primary text-sm">
                    Problem definition
                  </span>
                </div>
                <div className="bg-border mt-4 flex-1 h-0.5" />
                <div className="flex flex-col items-center flex-1 gap-3">
                  <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                    2
                  </div>
                  <span className="text-muted-foreground text-sm">
                    Assessment
                  </span>
                </div>
                <div className="bg-border mt-4 flex-1 h-0.5" />
                <div className="flex flex-col items-center flex-1 gap-3">
                  <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                    3
                  </div>
                  <span className="text-muted-foreground text-sm">
                    Planning
                  </span>
                </div>
                <div className="bg-border mt-4 flex-1 h-0.5" />
                <div className="flex flex-col items-center flex-1 gap-3">
                  <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-8">
                    4
                  </div>
                  <span className="text-muted-foreground text-sm">{`Review & approval`}</span>
                </div>
              </div>
              <Card className="overflow-hidden">
                <CardContent className="flex px-0 flex-col gap-4">
                  <div className="grid grid-cols-[1.55fr_1fr]">
                    <div className="border-y-border border-r border-r-border border-l-border flex p-8 flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <FieldLabel htmlFor="objective">
                          Simulation objective
                        </FieldLabel>
                        <Textarea
                          id="objective"
                          placeholder="Describe what you want to analyse, for example: aerodynamic performance of a wing at 50 m/s and 5° angle of attack."
                          defaultValue=""
                          className="resize-none min-h-28"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <FieldLabel>Geometry file</FieldLabel>
                        <button
                          type="button"
                          className="text-center rounded-lg bg-muted/40 border border-dashed border-border flex px-4 py-5 flex-col justify-center items-center gap-2 min-h-28 hover:bg-accent"
                        >
                          <CloudUpload className="text-primary size-6" />
                          <span className="font-medium text-foreground text-sm">
                            Upload STL geometry
                          </span>
                          <span className="text-muted-foreground text-xs">
                            Drag and drop or browse • Max 250 MB
                          </span>
                        </button>
                        <div className="rounded-lg bg-card border border-border flex px-4 py-3 items-center gap-3">
                          <File className="text-primary size-5" />
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-medium text-ellipsis whitespace-nowrap text-foreground text-sm overflow-hidden">
                              NACA_2412_wing.stl
                            </span>
                            <span className="text-muted-foreground text-xs">
                              18.4 MB
                            </span>
                          </div>
                          <button
                            type="button"
                            aria-label="Remove geometry file"
                            className="rounded-md text-muted-foreground p-1 hover:bg-accent hover:text-foreground"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      </div>
                      <FieldSet className="flex flex-col gap-4">
                        <FieldLegend>Flow conditions</FieldLegend>
                        <div className="grid gap-4 grid-cols-3">
                          <div className="flex flex-col gap-2">
                            <FieldLabel htmlFor="velocity">Velocity</FieldLabel>
                            <InputGroup>
                              <InputGroupInput
                                id="velocity"
                                defaultValue="50"
                              />
                              <InputGroupAddon align="inline-end">
                                <InputGroupText>m/s</InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </div>
                          <div className="flex flex-col gap-2">
                            <FieldLabel htmlFor="angle">
                              Angle of attack
                            </FieldLabel>
                            <InputGroup>
                              <InputGroupInput id="angle" defaultValue="5" />
                              <InputGroupAddon align="inline-end">
                                <InputGroupText>°</InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </div>
                          <div className="flex flex-col gap-2">
                            <FieldLabel htmlFor="temperature">
                              Temperature
                            </FieldLabel>
                            <InputGroup>
                              <InputGroupInput
                                id="temperature"
                                defaultValue="288"
                              />
                              <InputGroupAddon align="inline-end">
                                <InputGroupText>K</InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </div>
                        </div>
                      </FieldSet>
                      <div className="flex flex-col gap-2">
                        <FieldLabel htmlFor="analysis-type">
                          Analysis type
                        </FieldLabel>
                        <Select
                          defaultValue="external"
                          items={[
                            {
                              value: "external",
                              label: "External aerodynamics",
                            },
                          ]}
                        >
                          <SelectTrigger id="analysis-type">
                            <SelectValue placeholder="Select analysis type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="external">
                              External aerodynamics
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="border-x-border border-t border-t-border border-b-border flex pt-6 justify-between items-center">
                        <Button variant="outline">Save draft</Button>
                        <Button
                          onClick={() => navigate("/engineering-assessment")}
                        >
                          Continue to assessment{" "}
                          <ButtonEndIcon icon={ArrowRight} className="size-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted/40 flex p-8 flex-col gap-6">
                      <div className="flex flex-col gap-5">
                        <h2 className="font-semibold text-foreground text-xl">
                          Quick tips
                        </h2>
                        <div className="flex flex-col gap-4">
                          <div className="text-foreground text-sm flex items-center gap-3">
                            <Check className="text-primary size-4" />
                            Geometry or upload STL
                          </div>
                          <div className="text-foreground text-sm flex items-center gap-3">
                            <Check className="text-primary size-4" />
                            Flow conditions such as velocity and AoA
                          </div>
                          <div className="text-foreground text-sm flex items-center gap-3">
                            <Check className="text-primary size-4" />
                            Desired outputs such as lift and drag
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-card border border-border overflow-hidden">
                        <img
                          src="/assets/generated/e7ff1ee0-742e-46eb-808f-3730a2a68983.jpg"
                          alt="CFD visualization preview"
                          className="w-full h-40 object-cover"
                        />
                        <p className="text-muted-foreground text-sm p-4">
                          Your results will include pressure, velocity, lift and
                          drag.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}
