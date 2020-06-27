import { React, Browser } from "https://deno.land/x/next/mod.ts";

function Footer() {
  return <div>Footer Next</div>;
}

class View {
  techs = ["Next", "Deno"];
  render() {
    return (
      <ul>
        {this.techs.map((tech: any) => (
          <li>
            {tech}
          </li>
        ))}

        <Footer />
      </ul>
    );
  }
}

new Browser(<View />, {
  config: {
    port: 8080,
    path: import.meta.url,
  },
  container: "app",
});
