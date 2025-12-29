import webview

class Api:
    def save(self, key: str, value: str):
        # hier würdest du später SQLite/Datei nutzen
        print(f"SAVE {key}:\n{value}\n---")
        return {"ok": True}

    def load(self, key: str):
        # demo
        return {"ok": True, "value": f"(demo) nichts gespeichert für: {key}"}

if __name__ == "__main__":
    api = Api()
    window = webview.create_window(
        "Project Wizard (Demo)",
        url="index.html",
        width=1600,
        height=750,
        js_api=api,
        fullscreen=True
    )
    webview.start(debug=False)
