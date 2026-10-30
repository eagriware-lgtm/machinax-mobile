import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

type PartKind = "Cube" | "Cylinder" | "Wheel";
type Part = { id: number; kind: PartKind; size: string };

const palette = {
  background: "#0B1020",
  panel: "#121A2D",
  panelRaised: "#18233A",
  border: "#283550",
  text: "#F4F7FF",
  muted: "#9AA8C4",
  blue: "#5B8CFF",
  cyan: "#62E5D5",
  orange: "#FFB86B",
};

export default function App() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const [mode, setMode] = useState<"Inventor" | "Engineer">("Inventor");
  const [parts, setParts] = useState<Part[]>([
    { id: 1, kind: "Cube", size: "2 × 2 × 2" },
  ]);
  const [selectedId, setSelectedId] = useState(1);
  const selectedPart = useMemo(
    () => parts.find((part) => part.id === selectedId) ?? parts[0],
    [parts, selectedId]
  );

  function addPart(kind: PartKind) {
    const id = Math.max(0, ...parts.map((part) => part.id)) + 1;
    const size = kind === "Cylinder" ? "2 × 3 × 2" : kind === "Wheel" ? "1 × 1 × 1" : "2 × 2 × 2";
    setParts((current) => [...current, { id, kind, size }]);
    setSelectedId(id);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandMark}><Text style={styles.brandGlyph}>M</Text></View>
          <View style={styles.brandText}>
            <Text style={styles.eyebrow}>THE EPIC BUILDERS PRESENT</Text>
            <Text style={styles.brandName}>MachinaX <Text style={styles.brandAccent}>Mobile</Text></Text>
          </View>
          <View style={styles.versionPill}><Text style={styles.versionText}>ALPHA 0.1</Text></View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.kicker}>YOUR IDEAS. YOUR MACHINES.</Text>
          <Text style={styles.heroTitle}>Build something{"\n"}<Text style={styles.heroAccent}>awesome.</Text></Text>
          <Text style={styles.heroBody}>Start with simple parts. Learn by building. Grow into real engineering.</Text>
        </View>

        <View style={styles.modeSwitch}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setMode("Inventor")}
            style={[styles.modeButton, mode === "Inventor" && styles.modeButtonActive]}
          >
            <Text style={[styles.modeTitle, mode === "Inventor" && styles.modeTitleActive]}>✨ Inventor Mode</Text>
            <Text style={styles.modeSubtitle}>Build and explore</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => setMode("Engineer")}
            style={[styles.modeButton, mode === "Engineer" && styles.modeButtonActive]}
          >
            <Text style={[styles.modeTitle, mode === "Engineer" && styles.modeTitleActive]}>📐 Engineer Mode</Text>
            <Text style={styles.modeSubtitle}>Exact dimensions</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Workshop</Text>
            <Text style={styles.sectionSubtitle}>Your first prototype</Text>
          </View>
          <View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveText}>EDITING</Text></View>
        </View>

        <View style={[styles.editorLayout, isWide && styles.editorLayoutWide]}>
          <View style={styles.editorColumn}>
        <View style={styles.workspace}>
          <View style={styles.workspaceTop}>
            <Text style={styles.workspaceLabel}>BUILD SPACE</Text>
            <Text style={styles.workspaceCount}>{parts.length} {parts.length === 1 ? "part" : "parts"}</Text>
          </View>
          <View style={styles.preview}>
            <View style={styles.axis axisX} />
            <View style={styles.axis axisY} />
            <View style={styles.axis axisZ} />
            <View style={styles.platform}>
              <View style={styles.platformTop} />
              <View style={styles.platformFront} />
              <View style={styles.platformSide} />
            </View>
            {parts.slice(-5).map((part, index) => (
              <Pressable
                key={part.id}
                accessibilityRole="button"
                accessibilityLabel={"Select " + part.kind + " " + part.id}
                onPress={() => setSelectedId(part.id)}
                style={[
                  styles.partShape,
                  part.kind === "Cylinder" ? styles.cylinderShape : part.kind === "Wheel" ? styles.wheelShape : styles.cubeShape,
                  { left: 42 + (index % 3) * 58, top: 74 - Math.floor(index / 3) * 24 },
                  selectedId === part.id && styles.partSelected,
                ]}
              >
                <Text style={styles.partShapeText}>{part.kind === "Cylinder" ? "●" : part.kind === "Wheel" ? "◉" : "■"}</Text>
              </Pressable>
            ))}
            <Text style={styles.previewCaption}>INTERACTIVE PREVIEW · 3D ENGINE NEXT</Text>
          </View>

          <Text style={styles.addHeading}>Add a part</Text>
          <View style={styles.partButtons}>
            <PartButton emoji="🧊" label="Cube" hint="A building block" onPress={() => addPart("Cube")} />
            <PartButton emoji="🥫" label="Cylinder" hint="Round parts" onPress={() => addPart("Cylinder")} />
            <PartButton emoji="⚙️" label="Wheel" hint="Moving builds" onPress={() => addPart("Wheel")} />
          </View>
        </View>

          </View>
          <View style={styles.editorColumn}>
        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Parts list</Text>
            <Text style={styles.sectionSubtitle}>Tap a part to select it</Text>
          </View>
          <Text style={styles.partsTotal}>{parts.length} TOTAL</Text>
        </View>

        <View style={styles.partsPanel}>
          {parts.map((part) => (
            <Pressable
              key={part.id}
              accessibilityRole="button"
              onPress={() => setSelectedId(part.id)}
              style={[styles.partRow, selectedId === part.id && styles.partRowSelected]}
            >
              <View style={styles.partIcon}><Text>{part.kind === "Cube" ? "🧊" : part.kind === "Cylinder" ? "🥫" : "⚙️"}</Text></View>
              <View style={styles.partInfo}>
                <Text style={styles.partName}>{part.kind} {part.id}</Text>
                <Text style={styles.partDimensions}>{mode === "Engineer" ? "Dimensions: " + part.size : "Ready to build with"}</Text>
              </View>
              {selectedId === part.id && <Text style={styles.selectedTag}>SELECTED</Text>}
            </Pressable>
          ))}
        </View>

        {selectedPart && (
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>{mode === "Engineer" ? "📏" : "💡"}</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{mode === "Engineer" ? "Part dimensions" : "Builder tip"}</Text>
              <Text style={styles.tipBody}>
                {mode === "Engineer"
                  ? selectedPart.kind + " " + selectedPart.id + " · " + selectedPart.size + " units"
                  : "You've selected " + selectedPart.kind.toLowerCase() + " " + selectedPart.id + ". Try adding more parts to plan a new invention!"}
              </Text>
            </View>
          </View>
        )}

          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>MADE FOR CURIOUS MINDS ⚡</Text>
          <Text style={styles.footerBody}>A first step toward a real, touch-friendly CAD editor.</Text>
          <Text style={styles.footerSmall}>EBS · MachinaX Mobile · Early prototype</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PartButton({ emoji, label, hint, onPress }: { emoji: string; label: string; hint: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}>
      <Text style={styles.addEmoji}>{emoji}</Text>
      <Text style={styles.addLabel}>{label}</Text>
      <Text style={styles.addHint}>{hint}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  page: { padding: 20, paddingBottom: 42, maxWidth: 1240, width: "100%", alignSelf: "center" },
  editorLayout: { flexDirection: "column", gap: 18 },
  editorLayoutWide: { flexDirection: "row", alignItems: "flex-start" },
  editorColumn: { flex: 1, minWidth: 0, width: "100%" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 28, gap: 10 },
  brandMark: { width: 42, height: 42, borderRadius: 13, backgroundColor: palette.blue, alignItems: "center", justifyContent: "center" },
  brandGlyph: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
  brandText: { flex: 1 },
  eyebrow: { color: palette.muted, fontSize: 9, letterSpacing: 1.2, fontWeight: "800" },
  brandName: { color: palette.text, fontSize: 19, fontWeight: "900", marginTop: 2 },
  brandAccent: { color: palette.cyan },
  versionPill: { borderColor: palette.border, borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 6 },
  versionText: { color: palette.muted, fontSize: 9, fontWeight: "800" },
  hero: { marginBottom: 22 },
  kicker: { color: palette.cyan, fontSize: 10, letterSpacing: 1.7, fontWeight: "900", marginBottom: 10 },
  heroTitle: { color: palette.text, fontSize: 38, lineHeight: 42, fontWeight: "900", letterSpacing: -1 },
  heroAccent: { color: palette.blue },
  heroBody: { color: palette.muted, fontSize: 14, lineHeight: 21, marginTop: 12, maxWidth: 360 },
  modeSwitch: { flexDirection: "row", gap: 10, marginBottom: 28 },
  modeButton: { flex: 1, backgroundColor: palette.panel, borderWidth: 1, borderColor: palette.border, borderRadius: 15, padding: 13 },
  modeButtonActive: { backgroundColor: "#182747", borderColor: palette.blue },
  modeTitle: { color: palette.text, fontWeight: "800", fontSize: 12 },
  modeTitleActive: { color: palette.cyan },
  modeSubtitle: { color: palette.muted, fontSize: 10, marginTop: 6 },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12, marginTop: 2 },
  sectionTitle: { color: palette.text, fontSize: 20, fontWeight: "900" },
  sectionSubtitle: { color: palette.muted, fontSize: 11, marginTop: 3 },
  liveBadge: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#102A2A", paddingHorizontal: 9, paddingVertical: 7, borderRadius: 20 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: palette.cyan },
  liveText: { color: palette.cyan, fontSize: 9, fontWeight: "900", letterSpacing: 0.7 },
  workspace: { backgroundColor: palette.panel, borderRadius: 20, borderWidth: 1, borderColor: palette.border, padding: 14, marginBottom: 26 },
  workspaceTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  workspaceLabel: { color: palette.muted, fontSize: 9, fontWeight: "900", letterSpacing: 1.4 },
  workspaceCount: { color: palette.cyan, fontSize: 11, fontWeight: "800" },
  preview: { height: 210, borderRadius: 14, backgroundColor: "#0E1729", overflow: "hidden", marginTop: 12, position: "relative" },
  axis: { position: "absolute", height: 1, width: "80%", top: 112, left: "10%", backgroundColor: "#253651" },
  axisX: { transform: [{ rotate: "0deg" }] },
  axisY: { transform: [{ rotate: "60deg" }] },
  axisZ: { transform: [{ rotate: "-60deg" }] },
  platform: { position: "absolute", left: "17%", top: 128, width: "66%", height: 44 },
  platformTop: { position: "absolute", top: 0, left: 0, right: 0, height: 24, backgroundColor: "#253B5A", transform: [{ skewX: "-35deg" }], borderRadius: 3 },
  platformFront: { position: "absolute", top: 20, left: 8, right: 0, height: 12, backgroundColor: "#1A2B45", transform: [{ skewX: "-35deg" }] },
  platformSide: { position: "absolute", top: 20, right: 0, width: 12, height: 12, backgroundColor: "#314C70", transform: [{ skewY: "35deg" }] },
  partShape: { position: "absolute", width: 44, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  cubeShape: { backgroundColor: "#315CC2", borderColor: "#8DB0FF" },
  cylinderShape: { backgroundColor: "#176B75", borderColor: palette.cyan, borderRadius: 22 },
  wheelShape: { backgroundColor: "#493A85", borderColor: "#B9A7FF", borderRadius: 22 },
  partSelected: { borderWidth: 2, borderColor: "#FFFFFF" },
  partShapeText: { color: "#FFFFFF", fontSize: 21, fontWeight: "900" },
  previewCaption: { position: "absolute", bottom: 10, alignSelf: "center", color: "#6F83A6", fontSize: 8, fontWeight: "800", letterSpacing: 1 },
  addHeading: { color: palette.text, fontSize: 13, fontWeight: "800", marginTop: 16, marginBottom: 10 },
  partButtons: { flexDirection: "row", gap: 8 },
  addButton: { flex: 1, minHeight: 104, backgroundColor: palette.panelRaised, borderRadius: 13, borderWidth: 1, borderColor: palette.border, alignItems: "center", justifyContent: "center", padding: 8 },
  addButtonPressed: { borderColor: palette.cyan, opacity: 0.8 },
  addEmoji: { fontSize: 22, marginBottom: 7 },
  addLabel: { color: palette.text, fontSize: 12, fontWeight: "900" },
  addHint: { color: palette.muted, fontSize: 9, marginTop: 4, textAlign: "center" },
  partsTotal: { color: palette.muted, fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  partsPanel: { backgroundColor: palette.panel, borderRadius: 16, borderWidth: 1, borderColor: palette.border, paddingHorizontal: 10, marginBottom: 16 },
  partRow: { flexDirection: "row", alignItems: "center", paddingVertical: 11, paddingHorizontal: 5, borderBottomWidth: 1, borderBottomColor: "#202C42", gap: 10 },
  partRowSelected: { backgroundColor: "#182747", borderRadius: 10, paddingHorizontal: 8, borderBottomColor: "transparent" },
  partIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: palette.panelRaised, alignItems: "center", justifyContent: "center" },
  partInfo: { flex: 1 },
  partName: { color: palette.text, fontSize: 12, fontWeight: "800" },
  partDimensions: { color: palette.muted, fontSize: 10, marginTop: 4 },
  selectedTag: { color: palette.cyan, fontSize: 8, fontWeight: "900" },
  tipCard: { flexDirection: "row", alignItems: "flex-start", gap: 11, backgroundColor: "#132535", borderColor: "#254555", borderWidth: 1, borderRadius: 15, padding: 14 },
  tipIcon: { fontSize: 21 },
  tipContent: { flex: 1 },
  tipTitle: { color: palette.cyan, fontWeight: "900", fontSize: 12 },
  tipBody: { color: "#C1D0E3", fontSize: 11, lineHeight: 17, marginTop: 5 },
  footer: { alignItems: "center", marginTop: 28, paddingTop: 18, borderTopWidth: 1, borderTopColor: palette.border },
  footerTitle: { color: palette.text, fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  footerBody: { color: palette.muted, fontSize: 10, marginTop: 6, textAlign: "center" },
  footerSmall: { color: "#60718F", fontSize: 9, marginTop: 10 }
});
