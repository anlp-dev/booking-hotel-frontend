import React from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Avatar,
    Chip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { styled } from "@mui/system";

const classesData = [
    {
        name: "Toán lớp 10A",
        teacher: "Nguyễn Văn A",
        students: 30,
        assignments: 10,
        color: "#1976d2",
    },
    {
        name: "Hóa học lớp 11B",
        teacher: "Trần Thị B",
        students: 25,
        assignments: 12,
        color: "#d32f2f",
    },
    {
        name: "Vật lý lớp 12C",
        teacher: "Lê Minh C",
        students: 28,
        assignments: 8,
        color: "#388e3c",
    },
];

const StyledCard = styled(Card)(({ color }) => ({
    borderLeft: `8px solid ${color}`,
    transition: "transform 0.3s",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));

const Class = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
                Quản Lý Lớp Học
            </Typography>
            <Grid container spacing={3}>
                {classesData.map((classData, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <StyledCard color={classData.color} elevation={4}>
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <Avatar sx={{ bgcolor: classData.color, mr: 2 }}>
                                        <SchoolIcon />
                                    </Avatar>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        {classData.name}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <Chip
                                        icon={<PeopleIcon />}
                                        label={`Học sinh: ${classData.students}`}
                                        sx={{ mr: 1 }}
                                        color="primary"
                                    />
                                    <Chip
                                        icon={<AssignmentIcon />}
                                        label={`Bài tập: ${classData.assignments}`}
                                        color="secondary"
                                    />
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Giáo viên: {classData.teacher}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: classData.color,
                                        "&:hover": { backgroundColor: `${classData.color}DD` },
                                    }}
                                >
                                    Xem chi tiết
                                </Button>
                                <Button size="small" variant="outlined">
                                    Gửi thông báo
                                </Button>
                            </CardActions>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Class;
