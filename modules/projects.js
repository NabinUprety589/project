const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = [];
            projectData.forEach(proj => {
        
                const sectorObj = sectorData.find(sec => sec.id === proj.sector_id);
                const sectorName = sectorObj ? sectorObj.sector_name : "Unknown";

        
                const projWithSector = { ...proj, sector: sectorName };
                projects.push(projWithSector);
            });
            resolve();
        } catch (err) {
            reject("Unable to initialize projects: " + err);
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length === 0) {
            reject("No projects found");
        } else {
            resolve(projects);
        }
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(p => p.id === Number(projectId));
        if (project) {
            resolve(project);
        } else {
            reject(`Project with ID ${projectId} not found`);
        }
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const filtered = projects.filter(p =>
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );
        if (filtered.length > 0) {
            resolve(filtered);
        } else {
            reject(`No projects found for sector containing '${sector}'`);
        }
    });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
