import React from "react";
const createFocusTrap = require('focus-trap');

export function useOutsideClick(onOutsideClick, isActive) {
    const containerRef = React.useRef();
    const handler = React.useRef();
    handler.current = onOutsideClick;

    React.useEffect(
        () => {
            if (!containerRef.current) {
                return;
            }

            if (!isActive) {
                return;
            }

            function listener(e) {
                if (!containerRef.current.contains(e.target)) {
                    handler.current();
                }
            }

            document.addEventListener("click", listener);

            return () => {
                document.removeEventListener("click", listener);
            };
        },
        [isActive]
    );

    return containerRef;
}

export function useFocusTrap(isActive) {
    const containerRef = React.useRef();

    React.useEffect(
        () => {
            if (!containerRef.current) {
                return;
            }

            if (!isActive) {
                return;
            }

            const trap = createFocusTrap(containerRef.current, {
                clickOutsideDeactivates: true
            });

            trap.activate();

            return () => {
                trap.deactivate();
            };
        },
        [isActive]
    );

    return containerRef;
}

export function useEscPress(onEscPress, isActive) {
    React.useEffect(
        () => {
            if (!isActive) {
                return;
            }

            function listener(e) {
                if (e.key === "Escape") {
                    onEscPress();
                }
            }

            document.addEventListener("keydown", listener);

            return () => {
                document.removeEventListener("keydown", listener);
            };
        },
        [isActive]
    );
}

export function shareRef(...refs) {
    return thing => {
        refs.forEach(ref => (ref.current = thing));
    };
}
