const define = <const T extends string>(name: T): { key: T; endpoint: `/${T}` } => ({
    key: name,
    endpoint: `/${name}`,
});

export const resources = {
    analytics: define('analytics'),
    departments: define('departments'),
    tools: define('tools'),
    users: define('users'),
    userTools: define('user_tools'),
};
