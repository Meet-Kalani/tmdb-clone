export const mapCrewByDepartment = (department, crew) => {
  const departmentCrew = crew.filter(({ department: dept }) => dept === department);
  const crewMap = new Map();

  departmentCrew.forEach(({
    id, profile_path: profilePath, job, name, gender,
  }) => {
    if (crewMap.has(id)) {
      crewMap.get(id).jobs.push(job);
    }
    else {
      crewMap.set(id, {
        id,
        profilePath,
        name,
        gender,
        jobs: [job],
      });
    }
  });

  return Array.from(crewMap.values());
};
