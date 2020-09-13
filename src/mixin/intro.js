export default {
    data: () => ({
        demo: 'intros',
        introSteps: []
    }),
    methods: {
        initIntro() {
            this.intro = this.$intro();
            this.intro.setOptions({
                tooltipPosition: 'right',
                disableInteraction: true,
                showStepNumbers: false,
                highlightClass: 'intro__highlight',
                hidePrev: true,
                hideNext: true,
                skipLabel: '退出引导',
                nextLabel: '下一步',
                doneLabel: '退出引导',
                overlayOpacity: 0.5,
                exitOnOverlayClick: false,
                scrollPadding: 0,
                scrollToElement: false,
            });
            this.introSteps.forEach((step) => {
                let element = this.$el.querySelector(step.selector);
                const introStep = { ...step, element: element }
                this.intro.addStep(introStep)
              })
        }
    },
}