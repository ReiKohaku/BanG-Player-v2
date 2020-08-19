import Settings from "src/lib/util/settings";

export default function () {
  return {
    settings: Settings.getAll()
  }
}
