import { React, Browser } from "../mod.ts";

function Footer() {
  return <div>Footer Next</div>;
}

class View {
  techs = ["Next", "Deno"];
  tech = "";

  setTech(techName: any) {
    this.techs.filter((item) => {
      console.log(item);
    });
  }

  render() {
    return (
      <ul>
        {this.techs.map((tech: any) => (
          <li>
            {tech}
            <button onclick={this.setTech} aloha>x</button>
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
