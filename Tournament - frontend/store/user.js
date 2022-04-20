export const state = () => ({
  id: 1,
  name: "Quang",
  lastAccess: [
    {
      id: 2,
      title: "BITS",
      admin: "edward2362@rmit.edu.vn",
      completed: true,
      finished: true,
    },
    {
      id: 3,
      title: "Algorithms",
      admin: "edward2362@rmit.edu.vn",
      completed: true,
      finished: true,
    },
    {
      id: 4,
      title: "Machine Learning",
      admin: "edward2362@rmit.edu.vn",
      completed: true,
      finished: true,
    },
    {
      id: 5,
      title: "User Centered design",
      admin: "edward2362@rmit.edu.vn",
      completed: true,
      finished: true,
    },
    {
      id: 6,
      title: "Machine Learning",
      admin: "edward2362@rmit.edu.vn",
      completed: true,
      finished: true,
    },
  ],
});

export const getters = {
  getUserId(state) {
    return state.id;
  },
};
