import { atom, selector } from "recoil";

// export const notifications = atom({
//     key: "networkAtom",
//     default: {
//         network: 4,
//         jobs: 6,
//         messaging: 3,
//         notifications: 3
//     }
// });

// upper code will not work for Asynchronous data quries.

export const notifications = atom({
  key: "networkAtom",
  default: selector({
    key: "networkAtomSelector",
    get: async () => {
      const res = await axios.get("https://sum-server.100xdevs.com/notifications");
      return res.data;
    },
  }),
});

// this is how we deal with the issue

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const allNotifications = get(notifications);
    return (
      allNotifications.network +
      allNotifications.jobs +
      allNotifications.notifications +
      allNotifications.messaging
    );
  },
});
