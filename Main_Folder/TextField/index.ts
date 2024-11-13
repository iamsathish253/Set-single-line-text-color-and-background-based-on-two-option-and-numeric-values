import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class TextField implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container: HTMLDivElement;
    private notifyOutputChanged: () => void;
    private inputElement: HTMLInputElement;

    constructor() {}

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ) {
        this.container = container;
        this.notifyOutputChanged = notifyOutputChanged;

        // Create an input element for text entry
        this.inputElement = document.createElement("input");
        this.inputElement.type = "text"; // Default to text type
        this.inputElement.classList.add("textInputControlTwoOptionsCss");
        this.inputElement.style.width = "100%";

        // Apply initial styles and read-only behavior
        this.applyStyles(context);

        // Attach input change event
        this.inputElement.addEventListener("input", (event: Event) => {
            const target = event.target as HTMLInputElement;
            context.parameters.sampleProperty.raw = target.value;
            this.notifyOutputChanged();
        });

        // Attach input element to container
        this.container.appendChild(this.inputElement);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Update the input field value and apply styles
        this.inputElement.value = context.parameters.sampleProperty.raw || "";
        this.applyStyles(context);
    }

    private applyStyles(context: ComponentFramework.Context<IInputs>) {
        const toggleValue = context.parameters.toggleColor.raw || false;
        const numberValue = context.parameters.sampleNumber.raw || 0;
        const isReadOnly = context.parameters.readOnlyFlag.raw || "";

        // Apply background color based on conditions
        if (toggleValue || numberValue > 80) {
            this.inputElement.style.backgroundColor = "red";
            this.inputElement.style.color = "white";
        } else {
            this.inputElement.style.backgroundColor = "";
            this.inputElement.style.color = "black";
        }

        // Make the field read-only based on the readOnlyFlag parameter
    
        // Make the field read-only based on the readOnlyFlag parameter being "true"
     this.inputElement.readOnly = isReadOnly.toLowerCase() === "true";
    }

    public getOutputs(): IOutputs {
        return {
            sampleProperty: this.inputElement.value
        };
    }

    public destroy(): void {
        // Cleanup if necessary
    }
}
