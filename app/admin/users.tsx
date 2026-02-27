import { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import DashboardLayout from "../../components/DashboardLayout";
import ProtectedPage from "../../components/ProtectedPage";
import AdminUsersSidebar from "../../components/admin/AdminUsersSidebar";

import AddLangueForm from "../../components/admin/AddLangueForm";
import AddStudentForm from "../../components/admin/AddStudentForm";
import AddTeacherForm from "../../components/admin/AddTeacherForm";
import AssignStudentToTeacher from "../../components/admin/AssignStudentToTeacher";
import LanguesList from "../../components/admin/LanguesList";
import StudentsList from "../../components/admin/StudentsList";
import TeachersList from "../../components/admin/TeachersList";
import { adminUsersPageStyles as styles } from "../../styles/adminUsersPage.styles";

type AdminSection =
  | "ADD_STUDENT"
  | "ADD_TEACHER"
  | "LIST_STUDENTS"
  | "LIST_TEACHERS"
  | "ASSIGN"
  | "ADD_LANGUE"
  | "LIST_LANGUES";

export default function AdminUsersPage() {
  const [section, setSection] = useState<AdminSection>("LIST_STUDENTS");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (section) {
      case "ADD_STUDENT":
        return <AddStudentForm />;
      case "ADD_TEACHER":
        return <AddTeacherForm />;
      case "LIST_STUDENTS":
        return <StudentsList />;
      case "LIST_TEACHERS":
        return <TeachersList />;
      case "ASSIGN":
        return <AssignStudentToTeacher />;
      case "ADD_LANGUE":
        return <AddLangueForm />;
      case "LIST_LANGUES":
        return <LanguesList />;
      default:
        return null;
    }
  };

  return (
    <ProtectedPage allowedRoles={["ADMIN"]}>

      <ImageBackground
        source={require("../../assets/images/vb2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
        imageStyle={{ opacity: 0.8 }}
      >

      <DashboardLayout title="Gestion des Utilisateurs">
        <View style={styles.container}>
          {/* ✅ Bouton toggle (petit) */}
          <TouchableOpacity
            style={styles.sidebarToggle}
            onPress={() => setSidebarOpen((v) => !v)}
          >
            <Text style={styles.sidebarToggleText}>
              {sidebarOpen ? "✕" : "☰"}
            </Text>
          </TouchableOpacity>

          {/* ✅ Overlay (clique pour fermer) */}
          {sidebarOpen && (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.overlay}
              onPress={() => setSidebarOpen(false)}
            />
          )}

          {/* Contenu */}
          <View style={styles.content}>{renderContent()}</View>

          {/* Sidebar */}
          <AdminUsersSidebar
            active={section}
            onChange={setSection}
            visible={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </View>
      </DashboardLayout>

      </ImageBackground>
    </ProtectedPage>
  );
}