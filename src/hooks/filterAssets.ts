export interface Asset {
    checkboxName: string;
    label: string;
}

interface Filter {
    typeAssets: Asset[];
    formatAssets: Asset[];
    vendorAssets: Asset[];
}

export const resourceFilters: Filter = {
    typeAssets: [
        {
            checkboxName: "hdMap",
            label: "HD Map",
        },
        {
            checkboxName: "scenario",
            label: "Scenario",
        },
        {
            checkboxName: "environmentModel",
            label: "Environment Model",
        },
    ],
    formatAssets: [
        {
            checkboxName: "openDrive",
            label: "Opendrive",
        },
        {
            checkboxName: "fbx",
            label: "FBX",
        },
        {
            checkboxName: "openScenario",
            label: "OpenSCENARIO",
        },
    ],
    vendorAssets: [
        {
            checkboxName: "threeDMapping",
            label: "3D Mapping",
        },
        {
            checkboxName: "trainGraphics",
            label: "TrainGraphics",
        },
        {
            checkboxName: "dlr",
            label: "DLR",
        },
    ],
};
