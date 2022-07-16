<template>
    <div class="preview-wrapper">
        <div class="document-header">
            <h2>Preview</h2>
            <button
              class="preview-icon"
              @click="toChangeView"
              type="button"
            >
                <svg v-if="isOnlyPreview" width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.38.027a.795.795 0 0 1 .769.206L14.815 12.9a.792.792 0 0 1 0 1.124.792.792 0 0 1-1.124 0L9.234 9.567a2.77 2.77 0 0 1-3.753-3.753L1.024 1.357a.795.795 0 0 1 .357-1.33Zm.998 3.832 1.156 1.116a10.846 10.846 0 0 0-1.773 2.153c.696 1.117 2.929 4.038 6.333 3.959a6.127 6.127 0 0 0 1.346-.198l1.25 1.25a7.505 7.505 0 0 1-2.556.53h-.198c-4.663 0-7.331-4.282-7.83-5.145a.792.792 0 0 1 0-.792A12.58 12.58 0 0 1 2.378 3.86Zm5.328-2.272c4.726-.143 7.52 4.267 8.028 5.145.15.24.163.542.031.792a12.58 12.58 0 0 1-2.304 2.874l-1.195-1.116a10.846 10.846 0 0 0 1.813-2.154c-.705-1.116-2.937-4.045-6.333-3.958a6.127 6.127 0 0 0-1.346.198L5.149 2.117a7.505 7.505 0 0 1 2.557-.53Zm-.974 5.486v.055c0 .656.532 1.188 1.188 1.188l.047-.008-1.235-1.235Z" fill="#7C8187"/>
                </svg>
                <svg v-else width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z" fill="#7C8187"/>
                </svg>
            </button>
        </div>
        <div class="file-content">
            <div v-html="result"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { parseLine, buildLists } from '../../helpers/parsing';
// import { htmlTagsObj } from '../../constants/htmlTags';

export default {
    name: 'Preview',
    data() {
        return {
            result: '',
            resultArr: [],
            currentLine: '',
            previousLines: [],
            htmlTag: '',
            blockType: '',
            textContent: '',
        }
    },
    computed: {
        ...mapState(['isOnlyPreview', 'documentMdInView']),
    },
    methods: {
        ...mapActions(['toChangeView']),
        parseMarkdown() {
            const content = this.documentMdInView.content;
            console.log('%cBEGINNING', 'color: magenta', content);

            if (!content) return;
            
            // TRY: wait for white space to decide the tag, if no white space
            // print regular text

            // TODO: need an extra function to CHECK for newlines and split the 
            // content so it can be further processed as either old or new/current 
            // lines.
            // IF there is a newline in the content string, we know there is old
            // content, and we have to treat it as such. 
            // Anything AFTER the LAST newline will be treated as the current line

            // if there are new lines, we can parse without the "on the fly" parsing
            // this is for existing text that we need to print to the screen
            let currentLastLine;
            if (content.includes('\n')) {
                const oldLines = content.split('\n');
                console.log('whole array', oldLines);
                // If newline is the last character, we assume only parsing old lines
                if (content.lastIndexOf('\n') === content.length - 1) {
                    this.previousLines = oldLines;
                    this.currentLine = '';
                } else { // If newline isn't last, the assume the user is typing
                    this.previousLines = oldLines.slice(0, oldLines.length - 1);
                    console.log('previous', this.previousLines);

                    this.currentLine = oldLines[oldLines.length - 1];
                    console.log('current LINE', this.currentLine);
                } 
                let parsedPreviousLines = this.previousLines.map(line => {
                    const lineToRender = parseLine(line);
                    return lineToRender;
                }).filter(item => item);
                console.log('parsed prev lines', parsedPreviousLines);
                currentLastLine = parseLine(this.currentLine);
                this.resultArr = parsedPreviousLines;

                buildLists(this.resultArr);

                if (this.currentLine) {
                    this.resultArr.push(currentLastLine);
                }
                
                console.log('%c has prev lines', 'color: green', this.resultArr);
                this.result = this.resultArr.join('');
            } else {
                this.currentLine = content;
                currentLastLine = parseLine(this.currentLine);
                this.result = currentLastLine;
                console.log('%c no prev lines', 'color: orange', this.result);
            }
            
            return this.htmlTag;
        },
    },
    watch: {
        documentMdInView: {
            immediate: true,
            handler() {
                this.parseMarkdown();
            },
            deep: true,
        }
    },
}
</script>

<style lang="scss" scoped>
.preview-wrapper {
    flex-grow: 1;
    flex-basis: 0;
}

.document-header {
    display: flex;
    justify-content: space-between;
}

.preview-icon {
    border: none;
    background-color: var(--content-header-bg);
    cursor: pointer;

    &:hover svg path {
        fill: var(--orange);
    }
}

.file-content {
    max-width: 672px;
    align-items: flex-start;
    justify-content: flex-start;
}
</style>