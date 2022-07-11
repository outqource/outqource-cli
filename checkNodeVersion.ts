const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split(".");
const major = Number(semver[0]);

export default function checkNodeVersion() {
  if ((major as number) < 14) {
    console.error(
      "You are running Node " +
        currentNodeVersion +
        ".\n" +
        "Outqource CLI requires Node 14 or higher. \n" +
        "Please update your version of Node."
    );
    process.exit(1);
  }
}
