import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  FileCheckCorner,
  MessageSquareText,
  Network,
  Play,
  Sparkles,
} from "lucide-react";
import {
  Badge,
  BadgeIcon,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/flowcn";

import "./9027e135-1aca-4d20-85f1-461326d771c6.css";
import "./EngineerMind-Landing.screen.css";

export default function EngineerMindLanding() {
  const navigate = useNavigate();
  return (
    <div data-appearance="light">
      <div className="bg-background text-foreground w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <header className="border-t-border border-r-border border-b border-b-border border-l-border flex px-12 justify-between items-center h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="rounded-full bg-primary text-primary-foreground flex justify-center items-center size-9">
              <Sparkles className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base tracking-tight">
                EngineerMind AI
              </span>
              <span className="text-muted-foreground text-xs">
                Think · Simulate · Validate
              </span>
            </div>
          </a>
          <nav
            aria-label="Marketing navigation"
            className="text-muted-foreground text-sm hidden items-center gap-8 lg:flex"
          >
            <a href="#product" className="hover:text-foreground">
              Product
            </a>
            <a href="#workflow" className="hover:text-foreground">
              How it works
            </a>
            <a href="#capabilities" className="hover:text-foreground">
              Capabilities
            </a>
            <a href="#resources" className="hover:text-foreground">
              Resources
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="font-medium rounded-md text-muted-foreground text-sm px-4 py-2 hover:bg-accent hover:text-foreground cursor-pointer"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="font-medium rounded-md bg-primary text-primary-foreground text-sm flex px-4 py-2 items-center gap-2 hover:bg-primary/90 cursor-pointer"
            >
              Get started
              <ArrowUpRight className="size-4" />
            </button>
          </div>
        </header>
        <main>
          <section
            id="product"
            className="flex mx-auto px-12 pt-24 pb-20 flex-col items-center gap-12 max-w-7xl"
          >
            <div className="text-center flex flex-col items-center gap-6 max-w-4xl">
              <Badge
                variant="secondary"
                className="text-primary px-3 py-1.5 gap-2"
              >
                <BadgeIcon icon={Sparkles} className="size-3.5" />
                AI-assisted engineering workflows
              </Badge>
              <h1 className="font-semibold text-6xl leading-tight tracking-tight max-w-4xl">
                Move from engineering question to confident decision.
              </h1>
              <p className="text-muted-foreground text-lg leading-8 max-w-2xl">
                EngineerMind AI helps engineers define, simulate, validate, and
                communicate complex fluid problems without losing the reasoning
                behind every result.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="font-medium rounded-md bg-primary text-primary-foreground text-sm flex px-5 py-3 items-center gap-2 hover:bg-primary/90 cursor-pointer"
                  onClick={() => navigate("/problem-definition")}
                >
                  Start a simulation
                  <ArrowRight className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  className="font-medium rounded-md text-foreground text-sm border border-border flex px-5 py-3 items-center gap-2 hover:bg-accent cursor-pointer"
                >
                  Go to Workspace
                  <Play className="size-4" />
                </button>
              </div>
            </div>
            <div className="shadow-lg rounded-xl bg-card border border-border p-3 w-full overflow-hidden">
              <div className="rounded-lg relative aspect-[16/7] overflow-hidden">
                <img
                  alt="Airplane wing above the clouds"
                  data-authorname="Medad Media"
                  data-authorurl="https://unsplash.com/@medadmedia"
                  data-blurhash="LfEzD_Dh8^t8IvnhxtRkNKs-n$a}"
                  data-photoid="_UrzQr9zsVE"
                  src="https://images.unsplash.com/photo-1789184721693-e8bd062b0ce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYWlycGxhbmUlMjBmbHlpbmclMjBhYm92ZSUyMGNsb3VkcyUyMHZpZXdlZCUyMGZyb20lMjBwYXNzZW5nZXIlMjB3aW5kb3d8ZW58MXwwfHx8MTc5NTExMzI5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                  className="size-full object-cover"
                />
                <div className="bg-linear-to-t from-black/70 via-black/30 to-transparent text-white absolute inset-x-0 bottom-0 px-10 pt-24 pb-8">
                  <div className="flex justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium uppercase text-white/80 text-xs tracking-widest">
                        Case study · EM-2048
                      </span>
                      <span className="font-semibold text-2xl">
                        NACA 2412 wing performance
                      </span>
                      <span className="text-white/80 text-sm">
                        Validated in 18 minutes
                      </span>
                    </div>
                    <div className="backdrop-blur-sm rounded-full bg-background/15 flex justify-center items-center shrink-0 size-12">
                      <ArrowUpRight className="size-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid px-4 pt-5 pb-2 gap-6 grid-cols-3">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs">
                    Lift coefficient
                  </span>
                  <span className="font-semibold text-lg">0.842</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs">
                    Drag coefficient
                  </span>
                  <span className="font-semibold text-lg">0.031</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs">
                    Validation
                  </span>
                  <span className="font-semibold text-primary text-lg flex items-center gap-1">
                    <CircleCheck className="size-4" />
                    Ready
                  </span>
                </div>
              </div>
            </div>
            <div className="text-muted-foreground text-sm flex items-center gap-3">
              <div className="flex">
                <div className="font-semibold rounded-full bg-primary/15 text-primary text-xs border-2 border-background flex -mr-2 justify-center items-center size-8">
                  AK
                </div>
                <div className="font-semibold rounded-full bg-secondary text-xs border-2 border-background flex -mr-2 justify-center items-center size-8">
                  JM
                </div>
                <div className="font-semibold rounded-full bg-accent text-xs border-2 border-background flex justify-center items-center size-8">
                  RS
                </div>
              </div>
              <span>Built for teams that take engineering seriously</span>
            </div>
          </section>
          <section
            id="capabilities"
            className="bg-muted/30 border-x-border border-y border-y-border px-12 py-20"
          >
            <div className="flex mx-auto items-start gap-16 max-w-7xl">
              <div className="flex flex-col shrink-0 gap-4 w-1/3">
                <span className="font-semibold uppercase text-primary text-xs tracking-widest">
                  One workspace, end to end
                </span>
                <h2 className="font-semibold text-3xl tracking-tight">
                  Engineering clarity at every step.
                </h2>
                <p className="text-muted-foreground text-base leading-7">
                  Keep assumptions visible, recommendations explainable, and
                  results ready to share with the people who need to make the
                  call.
                </p>
              </div>
              <div className="grid grow shrink gap-4 grid-cols-2 basis-[0%]">
                <Card className="bg-background">
                  <CardHeader>
                    <div className="rounded-lg bg-primary/10 text-primary flex justify-center items-center size-11">
                      <MessageSquareText className="size-5" />
                    </div>
                    <CardTitle className="pt-2">
                      Define with confidence
                    </CardTitle>
                    <CardDescription>
                      Turn a plain-language objective, geometry, and flow
                      conditions into a well-formed engineering problem.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-background mt-10">
                  <CardHeader>
                    <div className="rounded-lg bg-primary/10 text-primary flex justify-center items-center size-11">
                      <Network className="size-5" />
                    </div>
                    <CardTitle className="pt-2">
                      Plan the right approach
                    </CardTitle>
                    <CardDescription>
                      Get a reasoned recommendation for solver, turbulence
                      model, boundary conditions, and mesh strategy.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-background col-span-2">
                  <CardHeader>
                    <div className="rounded-lg bg-primary/10 text-primary flex justify-center items-center size-11">
                      <FileCheckCorner className="size-5" />
                    </div>
                    <CardTitle className="pt-2">
                      Validate and communicate
                    </CardTitle>
                    <CardDescription>
                      Understand convergence, inspect the important
                      observations, and export a report your team can trust.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>
          <section
            id="workflow"
            className="flex mx-auto px-12 py-20 flex-col gap-12 max-w-7xl"
          >
            <div className="grid items-end gap-12 grid-cols-2">
              <div className="flex flex-col gap-3">
                <span className="font-semibold uppercase text-primary text-xs tracking-widest">
                  A guided workflow
                </span>
                <h2 className="font-semibold text-3xl tracking-tight">
                  From first question to final report.
                </h2>
              </div>
              <p className="text-muted-foreground text-base leading-7 max-w-lg">
                A clear path keeps the technical work moving while giving you
                room to inspect and adjust every recommendation.
              </p>
            </div>
            <div className="grid gap-8 grid-cols-3">
              <div className="border-t-2 border-t-primary flex pt-5 flex-col gap-4 row-span-2">
                <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-9">
                  01
                </div>
                <h3 className="font-semibold text-xl">Define</h3>
                <p className="text-muted-foreground text-sm leading-6">
                  Describe the objective, upload your STL, and add the basic
                  flow conditions.
                </p>
              </div>
              <div className="border-t-2 border-t-border flex pt-5 flex-col gap-4">
                <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-9">
                  02
                </div>
                <h3 className="font-semibold">Assess</h3>
                <p className="text-muted-foreground text-sm leading-6">
                  Review calculated parameters, observations, and the
                  information still needed.
                </p>
              </div>
              <div className="border-t-2 border-t-border flex pt-5 flex-col gap-4">
                <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-9">
                  03
                </div>
                <h3 className="font-semibold">Plan</h3>
                <p className="text-muted-foreground text-sm leading-6">
                  Inspect the recommended solver, model, mesh, and boundary
                  conditions.
                </p>
              </div>
              <div className="border-t-2 border-t-border flex pt-5 flex-col gap-4 col-span-2">
                <div className="font-semibold rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-9">
                  04
                </div>
                <h3 className="font-semibold">Validate</h3>
                <p className="text-muted-foreground text-sm leading-6">
                  Monitor convergence, understand the result, and share an
                  engineering report.
                </p>
              </div>
            </div>
          </section>
          <section id="start" className="px-12 pb-20">
            <div className="rounded-xl bg-primary text-primary-foreground flex mx-auto px-10 py-12 justify-between items-center gap-8 max-w-7xl">
              <div className="flex flex-col gap-3 max-w-2xl">
                <span className="font-semibold uppercase text-primary-foreground/70 text-xs tracking-widest">
                  Ready when you are
                </span>
                <h2 className="font-semibold text-3xl tracking-tight">
                  Bring your next engineering problem into focus.
                </h2>
                <p className="text-primary-foreground/80 text-base leading-7">
                  Start with the question. EngineerMind AI will help you work
                  through the rest.
                </p>
              </div>
              <a
                href="#signin"
                className="font-medium rounded-md bg-background text-foreground text-sm flex px-5 py-3 items-center shrink-0 gap-2 hover:bg-background/90"
                onClick={() => navigate("/engineermind-home")}
              >
                Create your workspace
                <ArrowRight className="size-4" />
              </a>
            </div>
          </section>
        </main>
        <footer
          id="resources"
          className="text-muted-foreground text-sm border-x-border border-t border-t-border border-b-border flex px-12 py-8 justify-between items-center"
        >
          <span>© 2024 EngineerMind AI</span>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#terms" className="hover:text-foreground">
              Terms
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
